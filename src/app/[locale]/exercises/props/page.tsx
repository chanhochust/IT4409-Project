'use client';
import Link from 'next/link';
import { getServerTranslation } from 'src/shared/i18n/i18nServer';
import React, { useState } from 'react';

interface User {
  name: string;
  age: number;
  email: string;
}

function UserProfile({ user }: { readonly user: User }) {
  return (
    <div className='mb-5 space-y-2 border-2 border-black p-8'>
      <p>User's name: {user.name}</p>
      <p>User's mail: {user.email}</p>
      <p>User's age: {user.age}</p>
    </div>
  );
}

function UserList() {
  const users: User[] = [
    { name: 'Nam Tran', email: 'nam@mail.com', age: 22 },
    { name: 'Huy Tran', email: 'huy@mail.com', age: 28 },
    { name: 'Thien Pham', email: 'thien@mail.com', age: 31 },
  ];
  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>User List</h2>
      <div className='space-x-10'>
        {users.map((u) => (
          <UserProfile key={u.email} user={u} />
        ))}
      </div>
    </div>
  );
}

export default function Counter({ params }: { readonly params: { locale: string } }) {
  const locale = 'en';

  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-bold'>About Page</h1>
      <div className='mt-8'></div>
      <UserList />
      <Link href={`/${locale}`} className='text-blue-500 hover:underline'>
        Back to Home
      </Link>
    </div>
  );
}
