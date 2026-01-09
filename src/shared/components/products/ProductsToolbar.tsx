'use client';

import React from 'react';
import { AppSelect } from 'src/shared/components/ui/select/AppSelect';

interface ProductsToolbarProps {
  limit: number;
  onLimitChange: (limit: number) => void;
  title?: string;
}

export function ProductsToolbar({ limit, onLimitChange, title = 'Products' }: ProductsToolbarProps) {
  function handleLimitChange(value: string) {
    onLimitChange(parseInt(value, 10));
  }

  return (
    <div className='flex items-center justify-between gap-4 py-6'>
      <h1 className='text-foreground text-2xl font-bold'>{title}</h1>

      <div className='flex items-center gap-3'>
        <label className='text-muted-foreground flex items-center gap-2 text-sm'>
          <span>Items per page:</span>
          <AppSelect.Root value={String(limit)} onValueChange={handleLimitChange}>
            <AppSelect.Trigger className='w-20'>
              <AppSelect.Value />
            </AppSelect.Trigger>
            <AppSelect.Content>
              <AppSelect.Item value='10'>10</AppSelect.Item>
              <AppSelect.Item value='20'>20</AppSelect.Item>
              <AppSelect.Item value='30'>30</AppSelect.Item>
              <AppSelect.Item value='50'>50</AppSelect.Item>
            </AppSelect.Content>
          </AppSelect.Root>
        </label>
      </div>
    </div>
  );
}
