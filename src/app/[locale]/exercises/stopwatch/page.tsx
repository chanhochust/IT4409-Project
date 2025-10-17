'use client';
import React, { useEffect, useState } from 'react';

export default function StopwatchExercise() {
  const [running, setRunning] = useState(false);
  const [startAt, setStartAt] = useState<number | null>(null);
  const [baseElapsed, setBaseElapsed] = useState(0);
  const [displayMs, setDisplayMs] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(
    function () {
      if (!running || startAt === null) return;
      const id = setInterval(function () {
        setDisplayMs(baseElapsed + (performance.now() - startAt));
      }, 10);
      return function () {
        clearInterval(id);
      };
    },
    [running, startAt, baseElapsed],
  );

  function format(ms: number) {
    const total = Math.max(0, Math.floor(ms));
    const h = Math.floor(total / 3600000);
    const m = Math.floor((total % 3600000) / 60000);
    const s = Math.floor((total % 60000) / 1000);
    const cs = Math.floor((total % 1000) / 10);
    const hStr = h.toString().padStart(2, '0');
    const mStr = m.toString().padStart(2, '0');
    const sStr = s.toString().padStart(2, '0');
    const csStr = cs.toString().padStart(2, '0');
    return `${hStr}:${mStr}:${sStr}.${csStr}`;
  }

  function handleStart() {
    if (running) return;
    const now = performance.now();
    setStartAt(now);
    setRunning(true);
  }

  function handleStop() {
    if (!running || startAt === null) return;
    const now = performance.now();
    const next = baseElapsed + (now - startAt);
    setBaseElapsed(next);
    setDisplayMs(next);
    setRunning(false);
    setStartAt(null);
  }

  function handleReset() {
    setRunning(false);
    setStartAt(null);
    setBaseElapsed(0);
    setDisplayMs(0);
    setLaps([]);
  }

  function handleLap() {
    const t = running && startAt !== null ? baseElapsed + (performance.now() - startAt) : baseElapsed;
    setLaps(function (prev) {
      return [t, ...prev];
    });
  }

  const shown = running && startAt !== null ? displayMs : baseElapsed;

  return (
    <div className='mx-auto max-w-xl p-6'>
      <h1 className='mb-6 text-2xl font-semibold'>Stopwatch</h1>

      <div className='mb-4 rounded-xl border border-gray-200 p-6 text-center'>
        <div className='font-mono text-4xl tabular-nums'>{format(shown)}</div>
      </div>

      <div className='mb-6 flex flex-wrap items-center gap-3'>
        {!running ? (
          <button onClick={handleStart} className='rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-black'>
            Start
          </button>
        ) : (
          <button onClick={handleStop} className='rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700'>
            Stop
          </button>
        )}
        <button
          onClick={handleLap}
          disabled={!running}
          className='rounded-md border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60'>
          Lap
        </button>
        <button onClick={handleReset} className='rounded-md border border-gray-300 px-4 py-2'>
          Reset
        </button>
      </div>

      <div className='rounded-xl border border-gray-200'>
        <div className='border-b border-gray-200 px-4 py-2 text-sm text-gray-600'>Laps</div>
        {laps.length === 0 ? (
          <div className='px-4 py-6 text-center text-gray-500'>No laps</div>
        ) : (
          <ul className='max-h-80 divide-y divide-gray-100 overflow-auto'>
            {laps.map(function (t, i, arr) {
              const idx = arr.length - i;
              const prev = i === arr.length - 1 ? 0 : arr[i + 1];
              if (prev === undefined) return null;
              const split = t - prev;
              return (
                <li key={`${t}-${i}`} className='flex items-center justify-between px-4 py-3 font-mono tabular-nums'>
                  <span className='text-gray-600'>Lap {idx}</span>
                  <span className='text-gray-900'>{format(t)}</span>
                  <span className='text-gray-500'>{format(split)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
