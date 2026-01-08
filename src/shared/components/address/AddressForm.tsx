'use client';

import React, { useEffect } from 'react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { AppInput } from 'src/shared/components/ui/input/AppInput';
import { AppSelect } from 'src/shared/components/ui/select/AppSelect';
import type { Address } from 'src/shared/types/api/address/address.type';
import type { CreateAddressPayload } from 'src/shared/types/api/address/createAddress.type';

interface AddressFormProps {
  address?: Address;
  error?: string;
  isSubmitting: boolean;
  onSubmit: (payload: CreateAddressPayload) => void;
}

export function AddressForm({ address, error, isSubmitting, onSubmit }: AddressFormProps) {
  const [formData, setFormData] = React.useState<CreateAddressPayload>({
    city: '',
    district: '',
    name: '',
    phone: '',
    street: '',
    type: 'home',
    ward: '',
  });

  useEffect(() => {
    if (address) {
      setFormData({
        city: address.city,
        district: address.district,
        name: address.name,
        phone: address.phone,
        street: address.street,
        type: address.type,
        ward: address.ward,
      });
    }
  }, [address]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(value: string) {
    setFormData((prev) => ({ ...prev, type: value as 'home' | 'office' | 'other' }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      {error && (
        <div className='border-destructive/50 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm'>
          {error}
        </div>
      )}
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        <label className='flex flex-col gap-1'>
          <span className='text-xs font-semibold'>Address Name</span>
          <AppInput
            name='name'
            placeholder='e.g., Home, Office'
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col gap-1'>
          <span className='text-xs font-semibold'>Phone</span>
          <AppInput
            name='phone'
            placeholder='+84 9XX XXX XXX'
            required
            type='tel'
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col gap-1'>
          <span className='text-xs font-semibold'>Street</span>
          <AppInput
            name='street'
            placeholder='Street address'
            required
            value={formData.street}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col gap-1'>
          <span className='text-xs font-semibold'>Ward</span>
          <AppInput name='ward' placeholder='Ward' required value={formData.ward} onChange={handleChange} />
        </label>

        <label className='flex flex-col gap-1'>
          <span className='text-xs font-semibold'>District</span>
          <AppInput name='district' placeholder='District' required value={formData.district} onChange={handleChange} />
        </label>

        <label className='flex flex-col gap-1'>
          <span className='text-xs font-semibold'>City</span>
          <AppInput name='city' placeholder='City' required value={formData.city} onChange={handleChange} />
        </label>

        <label className='flex flex-col gap-1 sm:col-span-2'>
          <span className='text-xs font-semibold'>Type</span>
          <AppSelect.Root value={formData.type} onValueChange={handleSelectChange}>
            <AppSelect.Trigger>
              <AppSelect.Value />
            </AppSelect.Trigger>
            <AppSelect.Content>
              <AppSelect.Item value='home'>Home</AppSelect.Item>
              <AppSelect.Item value='office'>Office</AppSelect.Item>
              <AppSelect.Item value='other'>Other</AppSelect.Item>
            </AppSelect.Content>
          </AppSelect.Root>
        </label>
      </div>

      <div className='flex gap-3 pt-4'>
        <AppButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Address'}
        </AppButton>
      </div>
    </form>
  );
}
