'use client';

import React from 'react';
import Link from 'next/link';
import { User, LogOut, MapPin, ClipboardList, Store } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { AppPopover } from 'src/shared/components/ui/popover/AppPopover';
import { AppButton } from 'src/shared/components/ui/button/AppButton';

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
          className='flex cursor-pointer items-center gap-2 select-none'>
          <User className='text-muted-foreground hover:text-primary h-5 w-5' />
          {name && <span className='text-foreground hidden text-sm font-medium sm:inline'>{name}</span>}
        </div>
      </AppPopover.Trigger>
      <AppPopover.Content
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='w-56 p-2'
        sideOffset={8}>
        <div className='flex flex-col gap-2'>
          <AppButton asChild variant='ghost'>
            <Link href='/profile' className='justify-start'>
              <User className='h-4 w-4' />
              <span>Profile</span>
            </Link>
          </AppButton>
          <AppButton asChild variant='ghost'>
            <Link href='/address' className='justify-start'>
              <MapPin className='h-4 w-4' />
              <span>Address</span>
            </Link>
          </AppButton>
          <AppButton asChild variant='ghost'>
            <Link href='/orders' className='justify-start'>
              <ClipboardList className='h-4 w-4' />
              <span>Orders</span>
            </Link>
          </AppButton>
          <AppButton asChild variant='ghost'>
            <Link href='/my-shop' className='justify-start'>
              <Store className='h-4 w-4' />
              <span>My Shop</span>
            </Link>
          </AppButton>
          <AppButton
            variant='ghost'
            className='justify-start'
            onClick={() => {
              setOpen(false);
              void signOut({ callbackUrl: '/' });
            }}>
            <LogOut className='h-4 w-4' />
            <span>Logout</span>
          </AppButton>
        </div>
      </AppPopover.Content>
    </AppPopover.Root>
  );
}
