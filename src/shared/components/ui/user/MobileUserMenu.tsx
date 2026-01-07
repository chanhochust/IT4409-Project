'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { AppPopover } from 'src/shared/components/ui/popover/AppPopover';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { cn } from 'src/shared/utils/className';

export function MobileUserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);

  const name = session?.user?.name ?? undefined;

  return (
    <AppPopover.Root open={open} onOpenChange={setOpen}>
      <AppPopover.Trigger asChild>
        <button
          type='button'
          className={cn('flex items-center gap-2 lg:hidden')}
          onClick={() => setOpen((v) => !v)}
          aria-label='Open user menu'>
          <Menu className={cn('text-muted-foreground h-6 w-6')} />
          {name && <span className={cn('text-foreground text-sm font-medium sm:hidden')}>{name}</span>}
        </button>
      </AppPopover.Trigger>
      <AppPopover.Content className={cn('w-56 p-2 sm:hidden')} sideOffset={8}>
        <div className={cn('flex flex-col gap-2')}>
          <AppButton asChild variant='ghost' onClick={() => setOpen(false)}>
            <Link href='/profile' className={cn('justify-start')}>
              <User className={cn('h-4 w-4')} />
              <span>Profile</span>
            </Link>
          </AppButton>
          <AppButton asChild variant='ghost' onClick={() => setOpen(false)}>
            <Link href='/settings' className={cn('justify-start')}>
              <Settings className={cn('h-4 w-4')} />
              <span>Settings</span>
            </Link>
          </AppButton>
          <AppButton
            variant='ghost'
            className={cn('justify-start')}
            onClick={() => {
              setOpen(false);
              void signOut({ callbackUrl: '/' });
            }}>
            <LogOut className={cn('h-4 w-4')} />
            <span>Logout</span>
          </AppButton>
        </div>
      </AppPopover.Content>
    </AppPopover.Root>
  );
}
