import React from 'react';
import { Calendar, IdCard, Mail, Phone, Globe, User as UserIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProfileDetailsProps {
  createdAt: string;
  email: string;
  id: string;
  name: string;
  gender: string;
  nationality: string;
  phone: string;
  defaultAddressId?: string | null;
  updatedAt: string;
}

function DetailItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className='flex items-start gap-4 py-4 first:pt-0 last:pb-0'>
      <div className='bg-muted/10 text-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg'>
        <Icon className='h-5 w-5' />
      </div>
      <div className='flex flex-col'>
        <span className='text-muted/60 text-xs font-bold tracking-widest uppercase'>{label}</span>
        <span className='text-foreground text-sm font-medium'>{value}</span>
      </div>
    </div>
  );
}

export function ProfileDetailsCard({
  createdAt,
  email,
  id,
  name,
  gender,
  nationality,
  phone,
  updatedAt,
}: ProfileDetailsProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='border-border bg-card-bg rounded-lg border p-8 shadow-xl'>
      <div className='divide-border/30 divide-y'>
        <DetailItem icon={Mail} label='Email Address' value={email} />
        <DetailItem icon={UserIcon} label='Username' value={name} />
        <DetailItem icon={UserIcon} label='Gender' value={gender} />
        <DetailItem icon={Globe} label='Nationality' value={nationality} />
        <DetailItem icon={Phone} label='Phone' value={phone} />
        <DetailItem icon={IdCard} label='User ID' value={id} />
        <DetailItem icon={Calendar} label='Created At' value={formatDate(createdAt)} />
        <DetailItem icon={Calendar} label='Last Updated' value={formatDate(updatedAt)} />
      </div>
    </div>
  );
}
