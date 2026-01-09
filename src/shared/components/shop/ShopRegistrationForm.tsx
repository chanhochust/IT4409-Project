'use client';

import * as React from 'react';
import { AppButton } from '../ui/button/AppButton';
import { AppCard } from '../ui/card/AppCard';
import { AppInput } from '../ui/input/AppInput';
import { AppLabel } from '../ui/label/AppLabel';
import { useCreateShopMutation } from 'src/shared/services/api/mutations/shop.mutation';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';

interface ShopRegistrationFormProps {
  onSuccess?: () => void;
}

export function ShopRegistrationForm({ onSuccess }: ShopRegistrationFormProps) {
  const [shopName, setShopName] = React.useState('');
  const [bussinessEmail, setBussinessEmail] = React.useState('');
  const [warehouseAddress, setWarehouseAddress] = React.useState('');
  const [logo, setLogo] = React.useState<File | null>(null);
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const createShopMutation = useCreateShopMutation();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, logo: 'Please select an image file' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, logo: 'Image size should be less than 5MB' }));
        return;
      }

      setLogo(file);
      setErrors((prev) => ({ ...prev, logo: '' }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!shopName.trim()) {
      newErrors.shopName = 'Shop name is required';
    }

    if (!bussinessEmail.trim()) {
      newErrors.bussinessEmail = 'Business email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bussinessEmail)) {
      newErrors.bussinessEmail = 'Please enter a valid email address';
    }

    if (!warehouseAddress.trim()) {
      newErrors.warehouseAddress = 'Warehouse address is required';
    }

    if (!logo) {
      newErrors.logo = 'Shop logo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createShopMutation.mutateAsync({
        shopName: shopName.trim(),
        bussinessEmail: bussinessEmail.trim(),
        warehouseAddress: warehouseAddress.trim(),
        logo: logo!,
      });

      toast.success('Shop registered successfully!');
      onSuccess?.();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage = err?.response?.data?.message || 'Failed to register shop. Please try again.';
      toast.error(errorMessage);
      console.error('Shop registration error:', error);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='mx-auto max-w-2xl'>
      <AppCard.Root>
        <AppCard.Header>
          <AppCard.Title>Register Your Shop</AppCard.Title>
          <AppCard.Description>Fill in the details below to create your shop and start selling</AppCard.Description>
        </AppCard.Header>
        <AppCard.Content>
          <form onSubmit={(e) => void handleSubmit(e)} className='space-y-6'>
            {/* Shop Name */}
            <div className='space-y-2'>
              <AppLabel htmlFor='shopName'>
                Shop Name <span className='text-destructive'>*</span>
              </AppLabel>
              <AppInput
                id='shopName'
                type='text'
                placeholder='Enter your shop name'
                value={shopName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShopName(e.target.value)}
                disabled={createShopMutation.isPending}
                className={errors.shopName ? 'border-destructive' : ''}
              />
              {errors.shopName && <p className='text-destructive text-sm'>{errors.shopName}</p>}
            </div>

            {/* Business Email */}
            <div className='space-y-2'>
              <AppLabel htmlFor='bussinessEmail'>
                Business Email <span className='text-destructive'>*</span>
              </AppLabel>
              <AppInput
                id='bussinessEmail'
                type='email'
                placeholder='business@example.com'
                value={bussinessEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBussinessEmail(e.target.value)}
                disabled={createShopMutation.isPending}
                className={errors.bussinessEmail ? 'border-destructive' : ''}
              />
              {errors.bussinessEmail && <p className='text-destructive text-sm'>{errors.bussinessEmail}</p>}
            </div>

            {/* Warehouse Address */}
            <div className='space-y-2'>
              <AppLabel htmlFor='warehouseAddress'>
                Warehouse Address <span className='text-destructive'>*</span>
              </AppLabel>
              <AppInput
                id='warehouseAddress'
                type='text'
                placeholder='Enter your warehouse address'
                value={warehouseAddress}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWarehouseAddress(e.target.value)}
                disabled={createShopMutation.isPending}
                className={errors.warehouseAddress ? 'border-destructive' : ''}
              />
              {errors.warehouseAddress && <p className='text-destructive text-sm'>{errors.warehouseAddress}</p>}
            </div>

            {/* Logo Upload */}
            <div className='space-y-2'>
              <AppLabel htmlFor='logo'>
                Shop Logo <span className='text-destructive'>*</span>
              </AppLabel>
              <div className='flex flex-col gap-4'>
                <input
                  ref={fileInputRef}
                  id='logo'
                  type='file'
                  accept='image/*'
                  onChange={handleLogoChange}
                  disabled={createShopMutation.isPending}
                  className='hidden'
                />
                <AppButton
                  type='button'
                  variant='outline'
                  onClick={handleFileButtonClick}
                  disabled={createShopMutation.isPending}
                  className='w-full'>
                  <Upload className='size-4' />
                  {logo ? 'Change Logo' : 'Upload Logo'}
                </AppButton>

                {logoPreview && (
                  <div className='flex justify-center'>
                    <div className='border-border relative size-32 overflow-hidden rounded-lg border-2'>
                      <img src={logoPreview} alt='Shop logo preview' className='size-full object-cover' />
                    </div>
                  </div>
                )}

                {logo && <p className='text-muted-foreground text-sm'>Selected: {logo.name}</p>}
              </div>
              {errors.logo && <p className='text-destructive text-sm'>{errors.logo}</p>}
            </div>

            {/* Submit Button */}
            <div className='flex justify-end gap-4 pt-4'>
              <AppButton type='submit' disabled={createShopMutation.isPending} className='min-w-[120px]'>
                {createShopMutation.isPending ? (
                  <>
                    <Loader2 className='size-4 animate-spin' />
                    Registering...
                  </>
                ) : (
                  'Register Shop'
                )}
              </AppButton>
            </div>
          </form>
        </AppCard.Content>
      </AppCard.Root>
    </div>
  );
}
