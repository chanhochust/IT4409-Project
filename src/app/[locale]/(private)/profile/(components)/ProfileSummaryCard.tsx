import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from 'src/shared/utils/className';

interface ProfileSummaryProps {
  avatar?: string;
  fullName: string;
  isActive: boolean;
  nickname: string;
  role: string;
}

export function ProfileSummaryCard({ avatar, fullName, isActive, nickname, role }: ProfileSummaryProps) {
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className='border-border bg-card-bg flex flex-col items-center rounded-lg border p-8 text-center shadow-xl'>
      <div className='relative mb-6'>
        <div className='border-border bg-muted/20 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4'>
          {avatar ? (
            <img src={avatar} alt={fullName} className='h-full w-full object-cover' />
          ) : (
            <span className='text-muted text-4xl font-bold'>{initials}</span>
          )}
        </div>
        <div
          className={cn(
            'border-background absolute right-2 bottom-2 h-5 w-5 rounded-full border-2',
            isActive ? 'bg-primary' : 'bg-muted',
          )}
        />
      </div>

      <h2 className='text-foreground text-xl font-bold'>{fullName}</h2>
      <p className='text-muted text-sm'>@{nickname}</p>

      <div className='mt-6 flex flex-wrap justify-center gap-2'>
        <span className='bg-primary/10 text-primary ring-primary/30 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ring-1'>
          <Shield className='h-3 w-3' />
          {role}
        </span>
        <span
          className={cn(
            'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ring-1',
            isActive ? 'bg-primary/10 text-primary ring-primary/30' : 'bg-muted/10 text-muted ring-muted/30',
          )}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  );
}
