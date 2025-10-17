'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

export default function DataFetchExercise() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const locale = 'en';

  useEffect(function () {
    const ac = new AbortController();

    async function fetchUsers(): Promise<void> {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', { signal: ac.signal });
        if (!res.ok) {
          throw new Error('HTTP ' + res.status + ' – ' + res.statusText);
        }
        const data: User[] = await res.json();
        setUsers(data);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <div className='mx-auto max-w-3xl p-6'>
      <h1 className='mb-4 text-2xl font-semibold'>Users</h1>
      {loading && <div className='text-gray-600'>Loading...</div>}
      {error && <div className='mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-700'>{error}</div>}
      {!loading && !error && (
        <ul className='space-y-3'>
          {users.map(function (u) {
            return (
              <li key={u.id} className='rounded-lg border border-gray-200 p-4'>
                <div className='font-semibold'>{u.name}</div>
                <div className='text-sm text-gray-700'>{u.email}</div>
                <div className='text-sm text-gray-500'>Company: {u.company?.name}</div>
              </li>
            );
          })}
        </ul>
      )}
      <Link href={`/${locale}`} className='text-blue-500 hover:underline'>
        Back to Home
      </Link>
    </div>
  );
}
