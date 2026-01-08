import { Edit2, Trash2 } from 'lucide-react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { AddressTypeBadge } from './AddressTypeBadge';
import type { Address } from 'src/shared/types/api/address/address.type';

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  isDeleting?: boolean;
}

export function AddressCard({ address, onEdit, onDelete, isDeleting }: AddressCardProps) {
  return (
    <div className='border-border bg-card flex flex-col justify-between rounded-lg border p-4'>
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex-1'>
          <h3 className='text-foreground text-lg font-semibold'>{address.name}</h3>
          <p className='text-muted-foreground text-sm'>{address.phone}</p>
        </div>
        <AddressTypeBadge type={address.type} />
      </div>

      <div className='text-muted-foreground mb-4 space-y-1 text-sm'>
        <p>{address.street}</p>
        <p>
          {address.ward}, {address.district}, {address.city}
        </p>
      </div>

      <div className='flex justify-end gap-2'>
        <AppButton size='sm' variant='outline' onClick={() => onEdit(address)} className='flex items-center gap-2'>
          <Edit2 className='h-4 w-4' />
          Edit
        </AppButton>
        <AppButton
          size='sm'
          onClick={() => onDelete(address)}
          disabled={isDeleting}
          className='flex items-center gap-2 bg-red-400'>
          <Trash2 className='h-4 w-4' />
          {isDeleting ? 'Deleting...' : 'Delete'}
        </AppButton>
      </div>
    </div>
  );
}
