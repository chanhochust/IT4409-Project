'use client';

import React from 'react';
import Link from 'next/link';
import { User, Settings, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { AppPopover } from 'src/shared/components/ui/popover/AppPopover';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { cn } from 'src/shared/utils/className';

export function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);

  const name = session?.user?.name ?? undefined;

  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  return (
    <AppPopover.Root open={open} onOpenChange={setOpen}>
      <AppPopover.Trigger asChild>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn('flex cursor-pointer items-center gap-2 select-none')}>
          <User className={cn('text-muted-foreground hover:text-primary h-5 w-5')} />
          {name && <span className={cn('text-foreground hidden text-sm font-medium sm:inline')}>{name}</span>}
        </div>
      </AppPopover.Trigger>
      <AppPopover.Content
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn('w-56 p-2')}
        sideOffset={8}>
        <div className={cn('flex flex-col gap-2')}>
          <AppButton asChild variant='ghost'>
            <Link href='/profile' className={cn('justify-start')}>
              <User className={cn('h-4 w-4')} />
              <span>Profile</span>
            </Link>
          </AppButton>
          <AppButton asChild variant='ghost'>
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
