'use client';

import React, { useEffect } from 'react';
import { AppButton } from 'src/shared/components/ui/button/AppButton';
import { AppInput } from 'src/shared/components/ui/input/AppInput';
import { AppSelect } from 'src/shared/components/ui/select/AppSelect';
import {
  findDistrictByCode,
  findDistrictCodeByName,
  findProvinceByCode,
  findProvinceCodeByName,
  findWardByCode,
  findWardCodeByName,
  getDistrictsByProvinceCode,
  getProvinces,
  getWardsByDistrictCode,
} from 'src/shared/utils/vietnamAddress';
import type { Address } from 'src/shared/types/api/address/address.type';
import type { CreateAddressPayload } from 'src/shared/types/api/address/createAddress.type';

interface AddressFormProps {
  address?: Address;
  error?: string;
  isSubmitting: boolean;
  isEditing?: boolean;
  onSubmit: (payload: CreateAddressPayload) => void;
}

export function AddressForm({ address, error, isSubmitting, isEditing, onSubmit }: AddressFormProps) {
  const provinces = React.useMemo(() => getProvinces(), []);
  const [provinceCode, setProvinceCode] = React.useState('');
  const [districtCode, setDistrictCode] = React.useState('');
  const [wardCode, setWardCode] = React.useState('');

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
      const resolvedProvinceCode = findProvinceCodeByName(address.city) ?? '';
      const resolvedDistrictCode =
        findDistrictCodeByName(address.district, {
          provinceCode: resolvedProvinceCode,
        }) ?? '';
      const resolvedWardCode = findWardCodeByName(address.ward, { districtCode: resolvedDistrictCode }) ?? '';

      setProvinceCode(resolvedProvinceCode);
      setDistrictCode(resolvedDistrictCode);
      setWardCode(resolvedWardCode);

      setFormData({
        city: address.city,
        district: address.district,
        name: address.name,
        phone: address.phone,
        street: address.street,
        type: address.type,
        ward: address.ward,
      });
      return;
    }

    setProvinceCode('');
    setDistrictCode('');
    setWardCode('');
    setFormData((prev) => ({ ...prev, city: '', district: '', ward: '' }));
  }, [address]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(value: string) {
    setFormData((prev) => ({ ...prev, type: value as 'home' | 'office' | 'other' }));
  }

  function handleProvinceChange(value: string) {
    const province = findProvinceByCode(value);
    setProvinceCode(value);
    setDistrictCode('');
    setWardCode('');
    setFormData((prev) => ({ ...prev, city: province?.name ?? '', district: '', ward: '' }));
  }

  function handleDistrictChange(value: string) {
    const district = findDistrictByCode(value);
    setDistrictCode(value);
    setWardCode('');
    setFormData((prev) => ({ ...prev, district: district?.name ?? '', ward: '' }));
  }

  function handleWardChange(value: string) {
    const ward = findWardByCode(value);
    setWardCode(value);
    setFormData((prev) => ({ ...prev, ward: ward?.name ?? '' }));
  }

  const districts = React.useMemo(() => {
    if (!provinceCode) return [];
    return getDistrictsByProvinceCode(provinceCode);
  }, [provinceCode]);

  const wards = React.useMemo(() => {
    if (!districtCode) return [];
    return getWardsByDistrictCode(districtCode);
  }, [districtCode]);

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
          <span className='text-xs font-semibold'>Province/City</span>
          <AppSelect.Root value={provinceCode} onValueChange={handleProvinceChange}>
            <AppSelect.Trigger>
              <AppSelect.Value placeholder='Select a province/city' />
            </AppSelect.Trigger>
            <AppSelect.Content>
              {provinces.map((province) => (
                <AppSelect.Item key={province.code} value={province.code}>
                  {province.name}
                </AppSelect.Item>
              ))}
            </AppSelect.Content>
          </AppSelect.Root>
        </label>

        <label className='flex flex-col gap-1'>
          <span className='text-xs font-semibold'>District</span>
          <AppSelect.Root
            value={districtCode}
            onValueChange={handleDistrictChange}
            disabled={!provinceCode || districts.length === 0}>
            <AppSelect.Trigger>
              <AppSelect.Value placeholder='Select a district' />
            </AppSelect.Trigger>
            <AppSelect.Content>
              {districts.map((district) => (
                <AppSelect.Item key={district.code} value={district.code}>
                  {district.name}
                </AppSelect.Item>
              ))}
            </AppSelect.Content>
          </AppSelect.Root>
        </label>

        <label className='flex flex-col gap-1'>
          <span className='text-xs font-semibold'>Ward</span>
          <AppSelect.Root
            value={wardCode}
            onValueChange={handleWardChange}
            disabled={!districtCode || wards.length === 0}>
            <AppSelect.Trigger>
              <AppSelect.Value placeholder='Select a ward' />
            </AppSelect.Trigger>
            <AppSelect.Content>
              {wards.map((ward) => (
                <AppSelect.Item key={ward.code} value={ward.code}>
                  {ward.name}
                </AppSelect.Item>
              ))}
            </AppSelect.Content>
          </AppSelect.Root>
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
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Address' : 'Save Address'}
        </AppButton>
      </div>
    </form>
  );
}
