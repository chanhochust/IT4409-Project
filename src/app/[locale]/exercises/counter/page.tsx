'use client';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Counter({ params }: { params: { locale: string } }) {
  const locale = 'en';
  const [counterNum, setCounter] = useState(0);

  function increase() {
    setCounter(counterNum + 1);
  }

  // function decrease() {
  //   if (counterNum > 0) {
  //     setCounter(counterNum - 1);
  //   }
  // }

  function decrease() {
    setCounter(Math.max(0, counterNum - 1));
  }

  function reset() {
    setCounter(0);
  }

  return (
    <div className='container mx-auto space-y-6 p-8'>
      <h1 className='text-3xl font-bold'>Counter Ex</h1>

      <p className='text-5xl'>{counterNum}</p>

      <div className='space-x-2'>
        {/* Increase by 1st way */}
        <button onClick={increase} className='rounded bg-blue-500 px-4 py-2 text-white'>
          Increase
        </button>

        {/* Decrease by 1st way */}
        <button onClick={decrease} className='rounded bg-blue-500 px-4 py-2 text-white'>
          Decrease(Normal)
        </button>

        {/* Decrease by 2st way */}
        <button
          onClick={() => {
            if (counterNum > 0) {
              setCounter(counterNum - 1);
            }
            //setCounter(Math.max(0, counterNum - 1))
          }}
          className='rounded bg-blue-500 px-4 py-2 text-white'>
          Decrease(ArrFunc)
        </button>

        {/* RESET */}
        <button
          onClick={() => {
            setCounter(0);
          }}
          className='rounded bg-blue-500 px-4 py-2 text-white'>
          RESET
        </button>
      </div>

      <div className='mt-8'>
        <Link href={`/${locale}`} className='text-blue-500 hover:underline'>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
