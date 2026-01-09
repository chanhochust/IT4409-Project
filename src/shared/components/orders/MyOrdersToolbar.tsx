import * as React from 'react';
import { AppSelect } from 'src/shared/components/ui/select/AppSelect';
import { AppButton } from 'src/shared/components/ui/button/AppButton';

interface MyOrdersToolbarProps {
  readonly limit: number;
  readonly onLimitChange: (limit: number) => void;
}

export function MyOrdersToolbar({ limit, onLimitChange }: MyOrdersToolbarProps) {
  function handleLimitChange(value: string) {
    const next = Number(value);
    if (!Number.isNaN(next)) {
      onLimitChange(next);
    }
  }

  return (
    <div className='bg-card border-border mb-4 flex items-center justify-between rounded-lg border px-4 py-3'>
      <div className='flex items-center gap-3'>
        <span className='text-muted-foreground text-sm'>Per page</span>
        <AppSelect.Root value={String(limit)} onValueChange={handleLimitChange}>
          <AppSelect.Trigger className='h-8 w-[80px]'>
            <AppSelect.Value placeholder={String(limit)} />
          </AppSelect.Trigger>
          <AppSelect.Content>
            {[5, 10, 20, 50].map((size) => (
              <AppSelect.Item key={size} value={String(size)}>
                {size}
              </AppSelect.Item>
            ))}
          </AppSelect.Content>
        </AppSelect.Root>
      </div>

      <div className='flex items-center gap-2'>
        <span className='text-muted-foreground text-sm'>Status</span>
        <AppSelect.Root disabled>
          <AppSelect.Trigger className='h-8 w-[140px]'>
            <AppSelect.Value placeholder='All (coming soon)' />
          </AppSelect.Trigger>
        </AppSelect.Root>
      </div>
    </div>
  );
}
