'use client';
import React, { useEffect, useMemo, useState } from 'react';

interface ExchangeRates {
  [key: string]: number;
}

function formatMoney(n: number, code: string) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: code }).format(n);
  } catch {
    return `${n.toLocaleString('en-US')} ${code}`;
  }
}

const FALLBACK_CODES = ['USD', 'EUR', 'GBP', 'JPY', 'VND', 'AUD', 'CAD', 'CNY', 'KRW', 'THB', 'INR', 'SGD'];

export default function CurrencyConverterExercise() {
  const [amount, setAmount] = useState<string>('1');
  const [from, setFrom] = useState<string>('USD');
  const [to, setTo] = useState<string>('VND');
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(function () {
    const ac = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD', { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!data || !data.rates) throw new Error('Invalid response');
        setRates(data.rates as ExchangeRates);
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    load();
    return function cleanup() {
      ac.abort();
    };
  }, []);

  const codes = useMemo(
    function () {
      const keys = Object.keys(rates);
      if (keys.length === 0) return FALLBACK_CODES;
      return Array.from(new Set(keys.concat('USD'))).sort();
    },
    [rates],
  );

  const parsedAmount = useMemo(
    function () {
      const n = parseFloat(amount);
      return isNaN(n) ? 0 : n;
    },
    [amount],
  );

  const result = useMemo(
    function () {
      if (from === to) return parsedAmount;
      const rFrom = rates[from];
      const rTo = rates[to];
      if (typeof rFrom !== 'number' || typeof rTo !== 'number') return 0;
      return parsedAmount * (rTo / rFrom);
    },
    [parsedAmount, from, to, rates],
  );

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
  }
  function handleFromChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setFrom(e.target.value);
  }
  function handleToChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTo(e.target.value);
  }
  function handleSwap() {
    setFrom(to);
    setTo(from);
  }
  function handleRetry() {
    setRates({});
    setError(null);
    setLoading(true);
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(function (r) {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(function (data) {
        if (!data || !data.rates) throw new Error('Invalid response');
        setRates(data.rates as ExchangeRates);
      })
      .catch(function (e: unknown) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      })
      .finally(function () {
        setLoading(false);
      });
  }

  return (
    <div className='mx-auto max-w-xl p-6'>
      <h1 className='mb-4 text-2xl font-semibold'>Currency Converter</h1>

      <div className='mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3'>
        <div className='sm:col-span-1'>
          <label className='mb-1 block text-sm text-gray-600'>Amount</label>
          <input
            type='number'
            value={amount}
            onChange={handleAmountChange}
            className='w-full rounded-md border border-gray-300 px-3 py-2'
            min='0'
            step='any'
          />
        </div>

        <div className='sm:col-span-1'>
          <label className='mb-1 block text-sm text-gray-600'>From</label>
          <select
            value={from}
            onChange={handleFromChange}
            className='w-full rounded-md border border-gray-300 px-3 py-2'>
            {codes.map(function (c) {
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>

        <div className='sm:col-span-1'>
          <label className='mb-1 block text-sm text-gray-600'>To</label>
          <select value={to} onChange={handleToChange} className='w-full rounded-md border border-gray-300 px-3 py-2'>
            {codes.map(function (c) {
              return (
                <option key={c} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className='mb-3 flex items-center gap-2'>
        <button onClick={handleSwap} className='rounded-md border border-gray-300 px-3 py-2'>
          Swap
        </button>
        <button onClick={handleRetry} className='rounded-md border border-gray-300 px-3 py-2'>
          Refresh Rates
        </button>
      </div>

      {loading && <div className='text-gray-600'>Loading rates...</div>}
      {error && <div className='mb-3 rounded-md border border-red-300 bg-red-50 p-3 text-red-700'>{error}</div>}

      <div className='mt-2 rounded-lg border border-gray-200 p-4'>
        <div className='text-sm text-gray-600'>
          {parsedAmount.toLocaleString()} {from} =
        </div>
        <div className='mt-1 text-xl font-semibold'>{formatMoney(result, to)}</div>
      </div>
    </div>
  );
}
