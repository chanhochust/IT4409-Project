'use client';

import React, { useState } from 'react';
import { AxiosError, isAxiosError } from 'axios';
import { Plus, RotateCcw } from 'lucide-react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { AppDialog } from 'src/shared/components/ui/dialog/AppDialog';
import { AddressCard } from 'src/shared/components/address/AddressCard';
import { AddressForm } from 'src/shared/components/address/AddressForm';
import { AddressSkeleton } from 'src/shared/components/address/AddressSkeleton';
import { useCreateAddressMutation } from 'src/shared/services/api/mutations/address.mutation';
import { useMyAddressesQuery } from 'src/shared/services/api/queries/address.query';
import { toast } from 'sonner';
import type { Address } from 'src/shared/types/api/address/address.type';
import type { CreateAddressPayload } from 'src/shared/types/api/address/createAddress.type';

export default function AddressPage() {
  const { data: addressesData, isLoading, isError, refetch } = useMyAddressesQuery();
  const createMutation = useCreateAddressMutation();

  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();
  const [formError, setFormError] = useState<string>('');

  function extractErrorMessage(error: unknown): string {
    if (isAxiosError<{ message?: string }>(error)) {
      return error.response?.data?.message ?? error.message ?? 'Failed to save address';
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'Failed to save address';
  }

  const addresses = addressesData?.data?.addresses ?? [];

  function handleOpenModal() {
    setEditingAddress(undefined);
    setOpen(true);
    setFormError('');
  }

  function handleEditAddress(address: Address) {
    setEditingAddress(address);
    setOpen(true);
    setFormError('');
  }

  function handleSubmit(payload: CreateAddressPayload) {
    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success('Address saved successfully');
        setOpen(false);
        setEditingAddress(undefined);
        setFormError('');
      },
      onError: (error: unknown) => {
        const errorMessage = extractErrorMessage(error);
        setFormError(errorMessage);
        toast.error(errorMessage);
      },
    });
  }

  if (isLoading) {
    return (
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-foreground mb-2 text-3xl font-bold'>My Addresses</h1>
          <p className='text-muted-foreground'>Manage your delivery and billing addresses</p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2'>
          {Array.from({ length: 4 }).map((_, i) => (
            <AddressSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8'>
        <div className='text-muted mb-4 h-16 w-16'>
          <RotateCcw className='h-full w-full opacity-20' />
        </div>
        <h2 className='text-foreground text-xl font-bold'>Failed to load addresses</h2>
        <AppButton
          onClick={() => {
            void refetch();
          }}
          className='mt-6 flex items-center gap-2'>
          <RotateCcw className='h-4 w-4' />
          Retry
        </AppButton>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h1 className='text-foreground mb-2 text-3xl font-bold'>My Addresses</h1>
          <p className='text-muted-foreground'>Manage your delivery and billing addresses</p>
        </div>
        <AppButton onClick={handleOpenModal} className='flex items-center gap-2'>
          <Plus className='h-4 w-4' />
          Add Address
        </AppButton>
      </div>

      {addresses.length === 0 ? (
        <div className='border-border bg-card flex flex-col items-center justify-center rounded-lg border p-12 text-center'>
          <p className='text-muted-foreground mb-6 text-sm'>Add your first address to get started</p>
          <AppButton onClick={handleOpenModal} className='flex items-center gap-2'>
            <Plus className='h-4 w-4' />
            Add Address
          </AppButton>
        </div>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2'>
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} onEdit={handleEditAddress} />
          ))}
        </div>
      )}

      <AppDialog.Root open={open} onOpenChange={setOpen}>
        <AppDialog.Content>
          <AppDialog.Header>
            <AppDialog.Title>{editingAddress ? 'Edit Address' : 'Add New Address'}</AppDialog.Title>
            <AppDialog.Description>
              {editingAddress ? 'Update your address information' : 'Add a new delivery or billing address'}
            </AppDialog.Description>
          </AppDialog.Header>

          <div className='py-4'>
            <AddressForm
              address={editingAddress}
              error={formError}
              isSubmitting={createMutation.isPending}
              onSubmit={handleSubmit}
            />
          </div>

          <AppDialog.Footer>
            <AppButton
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={createMutation.isPending}>
              Cancel
            </AppButton>
          </AppDialog.Footer>
        </AppDialog.Content>
      </AppDialog.Root>
    </div>
  );
}
