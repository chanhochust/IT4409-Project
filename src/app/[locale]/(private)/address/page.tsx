'use client';

import React, { useState } from 'react';
import { isAxiosError, type AxiosError } from 'axios';
import { Plus, RotateCcw, Star } from 'lucide-react';
import { type UseMutationResult } from '@tanstack/react-query';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { AppDialog } from 'src/shared/components/ui/dialog/AppDialog';
import { AppAlertDialog } from 'src/shared/components/ui/alert-dialog/AppAlertDialog';
import { AddressCard } from 'src/shared/components/address/AddressCard';
import { AddressForm } from 'src/shared/components/address/AddressForm';
import { AddressSkeleton } from 'src/shared/components/address/AddressSkeleton';
import {
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from 'src/shared/services/api/mutations/address.mutation';
import { useMyAddressesQuery } from 'src/shared/services/api/queries/address.query';
import { useProfileQuery } from 'src/shared/services/api/queries/profile.query';
import { useUpdateProfileMutation } from 'src/shared/services/api/mutations/profile.mutation';
import { toast } from 'sonner';
import type { Address } from 'src/shared/types/api/address/address.type';
import type { CreateAddressPayload, CreateAddressResponse } from 'src/shared/types/api/address/createAddress.type';

export default function AddressPage() {
  const { data: addressesData, isLoading, isError, refetch } = useMyAddressesQuery();
  const { data: profileData } = useProfileQuery();
  const createMutation: UseMutationResult<
    CreateAddressResponse,
    AxiosError<unknown>,
    CreateAddressPayload
  > = useCreateAddressMutation();
  const updateMutation: UseMutationResult<
    CreateAddressResponse,
    AxiosError<unknown>,
    { id: string; payload: CreateAddressPayload }
  > = useUpdateAddressMutation();
  const deleteMutation: UseMutationResult<
    { success: boolean; message: string },
    AxiosError<unknown>,
    string
  > = useDeleteAddressMutation();
  const updateProfileMutation = useUpdateProfileMutation();

  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();
  const [deletingAddress, setDeletingAddress] = useState<Address | undefined>();
  const [formError, setFormError] = useState<string>('');
  const [settingDefaultId, setSettingDefaultId] = useState<string | null>(null);

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
  const defaultAddressId = profileData?.data?.defaultAddressId;

  function handleSetDefaultAddress(address: Address) {
    setSettingDefaultId(address.id);
    updateProfileMutation.mutate(
      { defaultAddressId: address.id },
      {
        onSuccess: () => {
          toast.success('Default address updated successfully');
          setSettingDefaultId(null);
        },
        onError: (error: unknown) => {
          const errorMessage = extractErrorMessage(error);
          toast.error(errorMessage);
          setSettingDefaultId(null);
        },
      },
    );
  }

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
    if (editingAddress) {
      updateMutation.mutate(
        { id: editingAddress.id, payload },
        {
          onSuccess: () => {
            toast.success('Address updated successfully');
            setOpen(false);
            setEditingAddress(undefined);
            setFormError('');
          },
          onError: (error: unknown) => {
            const errorMessage = extractErrorMessage(error);
            setFormError(errorMessage);
            toast.error(errorMessage);
          },
        },
      );
    } else {
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
  }

  function handleDeleteAddress(address: Address) {
    setDeletingAddress(address);
    setDeleteDialogOpen(true);
  }

  function handleConfirmDelete() {
    if (!deletingAddress) return;

    deleteMutation.mutate(deletingAddress.id, {
      onSuccess: () => {
        toast.success('Address deleted successfully');
        setDeleteDialogOpen(false);
        setDeletingAddress(undefined);
      },
      onError: (error: unknown) => {
        const errorMessage = extractErrorMessage(error);
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

      {!defaultAddressId && addresses.length > 0 && (
        <div className='text-foreground mb-6 flex items-start gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4'>
          <Star className='h-5 w-5 shrink-0 text-yellow-600 dark:text-yellow-500' />
          <div>
            <p className='font-semibold'>No Default Address Set</p>
            <p className='text-muted-foreground text-sm'>Set a default address for faster checkout</p>
          </div>
        </div>
      )}

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
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
              isDeleting={deleteMutation.isPending && deletingAddress?.id === address.id}
              isDefault={address.id === defaultAddressId}
              onSetDefault={handleSetDefaultAddress}
              isSettingDefault={settingDefaultId === address.id}
            />
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
              isSubmitting={editingAddress ? updateMutation.isPending : createMutation.isPending}
              isEditing={!!editingAddress}
              onSubmit={handleSubmit}
            />
          </div>

          <AppDialog.Footer>
            <AppButton
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={editingAddress ? updateMutation.isPending : createMutation.isPending}>
              Cancel
            </AppButton>
          </AppDialog.Footer>
        </AppDialog.Content>
      </AppDialog.Root>

      <AppAlertDialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AppAlertDialog.Content>
          <AppAlertDialog.Header>
            <AppAlertDialog.Title>Delete Address</AppAlertDialog.Title>
            <AppAlertDialog.Description>
              Are you sure you want to delete this address? This cannot be undone.
            </AppAlertDialog.Description>
          </AppAlertDialog.Header>
          <AppAlertDialog.Footer>
            <AppAlertDialog.Cancel disabled={deleteMutation.isPending}>Cancel</AppAlertDialog.Cancel>
            <AppAlertDialog.Action onClick={handleConfirmDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AppAlertDialog.Action>
          </AppAlertDialog.Footer>
        </AppAlertDialog.Content>
      </AppAlertDialog.Root>
    </div>
  );
}
