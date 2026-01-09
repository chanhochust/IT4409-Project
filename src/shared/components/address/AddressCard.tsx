import { Edit2, Trash2, Star } from 'lucide-react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { AddressTypeBadge } from './AddressTypeBadge';
import type { Address } from 'src/shared/types/api/address/address.type';

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  isDeleting?: boolean;
  isDefault?: boolean;
  onSetDefault?: (address: Address) => void;
  isSettingDefault?: boolean;
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  isDeleting,
  isDefault,
  onSetDefault,
  isSettingDefault,
}: AddressCardProps) {
  return (
    <div
      className={`border-border bg-card flex flex-col justify-between rounded-lg border p-4 ${isDefault ? 'ring-2 ring-yellow-500' : ''}`}>
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <h3 className='text-foreground text-lg font-semibold'>{address.name}</h3>
            {isDefault && (
              <span className='flex items-center gap-1 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-700 dark:text-yellow-400'>
                <Star className='h-3 w-3 fill-current' />
                Default
              </span>
            )}
          </div>
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

      <div className='flex flex-wrap justify-end gap-2'>
        {onSetDefault && !isDefault && (
          <AppButton
            size='sm'
            variant='outline'
            onClick={() => onSetDefault(address)}
            disabled={isSettingDefault}
            className='flex items-center gap-2'>
            <Star className='h-4 w-4' />
            {isSettingDefault ? 'Setting...' : 'Set as Default'}
          </AppButton>
        )}
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
