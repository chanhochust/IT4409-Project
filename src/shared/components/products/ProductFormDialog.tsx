'use client';

import * as React from 'react';
import { AppButton } from '../ui/button/AppButton';
import { AppCard } from '../ui/card/AppCard';
import { AppInput } from '../ui/input/AppInput';
import { AppLabel } from '../ui/label/AppLabel';
import { useCreateProductMutation } from 'src/shared/services/api/mutations/product.mutation';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductFormDialog({ open, onOpenChange }: ProductFormDialogProps) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [stock, setStock] = React.useState('');
  const [discount, setDiscount] = React.useState('0');
  const [images, setImages] = React.useState<File[]>([]);
  const [thumbnail, setThumbnail] = React.useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const imagesInputRef = React.useRef<HTMLInputElement>(null);
  const thumbnailInputRef = React.useRef<HTMLInputElement>(null);
  const createProductMutation = useCreateProductMutation();

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate file types
    const invalidFiles = files.filter((file) => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setErrors((prev) => ({ ...prev, images: 'Please select only image files' }));
      return;
    }

    // Validate file sizes (max 5MB each)
    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setErrors((prev) => ({ ...prev, images: 'Each image should be less than 5MB' }));
      return;
    }

    setImages(files);
    setErrors((prev) => ({ ...prev, images: '' }));

    // Create previews
    const previews: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, thumbnail: 'Please select an image file' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, thumbnail: 'Image size should be less than 5MB' }));
      return;
    }

    setThumbnail(file);
    setErrors((prev) => ({ ...prev, thumbnail: '' }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!price || Number(price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (!stock || Number(stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }
    if (images.length === 0) {
      newErrors.images = 'At least one product image is required';
    }
    if (!thumbnail) {
      newErrors.thumbnail = 'Thumbnail image is required';
    }
    if (Number(discount) < 0 || Number(discount) > 100) {
      newErrors.discount = 'Discount must be between 0 and 100';
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
      await createProductMutation.mutateAsync({
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        category: category.trim(),
        stock: Number(stock),
        discount: Number(discount),
        images: images,
        thumbnail: thumbnail!,
      });

      toast.success('Product created successfully!');
      onOpenChange(false);
      resetForm();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage = err?.response?.data?.message || 'Failed to create product. Please try again.';
      toast.error(errorMessage);
      console.error('Product creation error:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setStock('');
    setDiscount('0');
    setImages([]);
    setThumbnail(null);
    setThumbnailPreview(null);
    setImagePreviews([]);
    setErrors({});
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='max-h-[90vh] w-full max-w-3xl overflow-y-auto'>
        <AppCard.Root>
          <AppCard.Header>
            <div className='flex items-center justify-between'>
              <AppCard.Title>Create New Product</AppCard.Title>
              <AppButton
                variant='ghost'
                size='icon'
                onClick={() => onOpenChange(false)}
                disabled={createProductMutation.isPending}>
                <X className='size-4' />
              </AppButton>
            </div>
            <AppCard.Description>Fill in the details to add a new product to your shop</AppCard.Description>
          </AppCard.Header>
          <AppCard.Content>
            <form onSubmit={(e) => void handleSubmit(e)} className='space-y-6'>
              {/* Product Name */}
              <div className='space-y-2'>
                <AppLabel htmlFor='name'>
                  Product Name <span className='text-destructive'>*</span>
                </AppLabel>
                <AppInput
                  id='name'
                  type='text'
                  placeholder='Enter product name'
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  disabled={createProductMutation.isPending}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className='text-destructive text-sm'>{errors.name}</p>}
              </div>

              {/* Description */}
              <div className='space-y-2'>
                <AppLabel htmlFor='description'>
                  Description <span className='text-destructive'>*</span>
                </AppLabel>
                <textarea
                  id='description'
                  placeholder='Enter product description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={createProductMutation.isPending}
                  rows={4}
                  className={`border-input placeholder:text-muted-foreground flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.description ? 'border-destructive' : ''}`}
                />
                {errors.description && <p className='text-destructive text-sm'>{errors.description}</p>}
              </div>

              {/* Price and Stock */}
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <AppLabel htmlFor='price'>
                    Price <span className='text-destructive'>*</span>
                  </AppLabel>
                  <AppInput
                    id='price'
                    type='number'
                    placeholder='0.00'
                    value={price}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                    disabled={createProductMutation.isPending}
                    min='0'
                    step='0.01'
                    className={errors.price ? 'border-destructive' : ''}
                  />
                  {errors.price && <p className='text-destructive text-sm'>{errors.price}</p>}
                </div>

                <div className='space-y-2'>
                  <AppLabel htmlFor='stock'>
                    Stock <span className='text-destructive'>*</span>
                  </AppLabel>
                  <AppInput
                    id='stock'
                    type='number'
                    placeholder='0'
                    value={stock}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStock(e.target.value)}
                    disabled={createProductMutation.isPending}
                    min='0'
                    className={errors.stock ? 'border-destructive' : ''}
                  />
                  {errors.stock && <p className='text-destructive text-sm'>{errors.stock}</p>}
                </div>
              </div>

              {/* Category and Discount */}
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <AppLabel htmlFor='category'>
                    Category <span className='text-destructive'>*</span>
                  </AppLabel>
                  <AppInput
                    id='category'
                    type='text'
                    placeholder='e.g., tech, fashion, food'
                    value={category}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                    disabled={createProductMutation.isPending}
                    className={errors.category ? 'border-destructive' : ''}
                  />
                  {errors.category && <p className='text-destructive text-sm'>{errors.category}</p>}
                </div>

                <div className='space-y-2'>
                  <AppLabel htmlFor='discount'>Discount (%)</AppLabel>
                  <AppInput
                    id='discount'
                    type='number'
                    placeholder='0'
                    value={discount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount(e.target.value)}
                    disabled={createProductMutation.isPending}
                    min='0'
                    max='100'
                    className={errors.discount ? 'border-destructive' : ''}
                  />
                  {errors.discount && <p className='text-destructive text-sm'>{errors.discount}</p>}
                </div>
              </div>

              {/* Images Upload */}
              <div className='space-y-2'>
                <AppLabel htmlFor='images'>
                  Product Images <span className='text-destructive'>*</span>
                </AppLabel>
                <div className='flex flex-col gap-4'>
                  <input
                    ref={imagesInputRef}
                    id='images'
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={handleImagesChange}
                    disabled={createProductMutation.isPending}
                    className='hidden'
                  />
                  <AppButton
                    type='button'
                    variant='outline'
                    onClick={() => imagesInputRef.current?.click()}
                    disabled={createProductMutation.isPending}
                    className='w-full'>
                    <Upload className='size-4' />
                    {images.length > 0 ? `${images.length} images selected` : 'Upload Images'}
                  </AppButton>

                  {imagePreviews.length > 0 && (
                    <div className='grid grid-cols-3 gap-4'>
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className='border-border relative aspect-square overflow-hidden rounded-lg border-2'>
                          <img src={preview} alt={`Product ${index + 1}`} className='size-full object-cover' />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.images && <p className='text-destructive text-sm'>{errors.images}</p>}
              </div>

              {/* Thumbnail Upload */}
              <div className='space-y-2'>
                <AppLabel htmlFor='thumbnail'>
                  Thumbnail <span className='text-destructive'>*</span>
                </AppLabel>
                <div className='flex flex-col gap-4'>
                  <input
                    ref={thumbnailInputRef}
                    id='thumbnail'
                    type='file'
                    accept='image/*'
                    onChange={handleThumbnailChange}
                    disabled={createProductMutation.isPending}
                    className='hidden'
                  />
                  <AppButton
                    type='button'
                    variant='outline'
                    onClick={() => thumbnailInputRef.current?.click()}
                    disabled={createProductMutation.isPending}
                    className='w-full'>
                    <Upload className='size-4' />
                    {thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail'}
                  </AppButton>

                  {thumbnailPreview && (
                    <div className='flex justify-center'>
                      <div className='border-border relative size-32 overflow-hidden rounded-lg border-2'>
                        <img src={thumbnailPreview} alt='Thumbnail preview' className='size-full object-cover' />
                      </div>
                    </div>
                  )}

                  {thumbnail && <p className='text-muted-foreground text-sm'>Selected: {thumbnail.name}</p>}
                </div>
                {errors.thumbnail && <p className='text-destructive text-sm'>{errors.thumbnail}</p>}
              </div>

              {/* Submit Buttons */}
              <div className='flex justify-end gap-4 pt-4'>
                <AppButton
                  type='button'
                  variant='outline'
                  onClick={() => onOpenChange(false)}
                  disabled={createProductMutation.isPending}>
                  Cancel
                </AppButton>
                <AppButton type='submit' disabled={createProductMutation.isPending} className='min-w-[120px]'>
                  {createProductMutation.isPending ? (
                    <>
                      <Loader2 className='size-4 animate-spin' />
                      Creating...
                    </>
                  ) : (
                    'Create Product'
                  )}
                </AppButton>
              </div>
            </form>
          </AppCard.Content>
        </AppCard.Root>
      </div>
    </div>
  );
}
