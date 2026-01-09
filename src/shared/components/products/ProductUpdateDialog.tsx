'use client';

import * as React from 'react';
import { AppButton } from '../ui/button/AppButton';
import { AppCard } from '../ui/card/AppCard';
import { AppInput } from '../ui/input/AppInput';
import { AppLabel } from '../ui/label/AppLabel';
import { Loader2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import type { ProductItem, UpdateProductPayload } from 'src/shared/types/api/product/product.type';
import { useUpdateProductMutation } from 'src/shared/services/api/mutations/product.mutation';

interface ProductUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductItem | null;
}

export function ProductUpdateDialog({ open, onOpenChange, product }: ProductUpdateDialogProps) {
  const mutate = useUpdateProductMutation();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [stock, setStock] = React.useState('');
  const [discount, setDiscount] = React.useState('0');

  const [newImages, setNewImages] = React.useState<File[]>([]);
  const [newThumbnail, setNewThumbnail] = React.useState<File | null>(null);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string | null>(null);

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const imagesInputRef = React.useRef<HTMLInputElement>(null);
  const thumbnailInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!product) return;
    setName(product.name ?? '');
    setDescription(product.description ?? '');
    setPrice(String(product.price ?? ''));
    setCategory(product.category ?? '');
    setStock(String(product.stock ?? ''));
    setDiscount(String(product.discount ?? 0));
    setImagePreviews([]);
    setThumbnailPreview(null);
    setNewImages([]);
    setNewThumbnail(null);
    setErrors({});
  }, [product]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const invalidFiles = files.filter((file) => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setErrors((prev) => ({ ...prev, images: 'Please select only image files' }));
      return;
    }

    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setErrors((prev) => ({ ...prev, images: 'Each image should be less than 5MB' }));
      return;
    }

    setNewImages(files);
    setErrors((prev) => ({ ...prev, images: '' }));

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

    setNewThumbnail(file);
    setErrors((prev) => ({ ...prev, thumbnail: '' }));

    const reader = new FileReader();
    reader.onloadend = () => setThumbnailPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Product name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price || Number(price) <= 0) newErrors.price = 'Valid price is required';
    if (!category.trim()) newErrors.category = 'Category is required';
    if (!stock || Number(stock) < 0) newErrors.stock = 'Valid stock quantity is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    if (!validateForm()) return;

    try {
      const payload: UpdateProductPayload = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        category: category.trim(),
        stock: Number(stock),
        discount: Number(discount),
      };
      if (newImages.length > 0) payload.images = newImages;
      if (newThumbnail) payload.thumbnail = newThumbnail;

      await mutate.mutateAsync({ productId: product.id, payload });
      toast.success('Product updated successfully!');
      onOpenChange(false);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage = err?.response?.data?.message || 'Failed to update product. Please try again.';
      toast.error(errorMessage);
      console.error('Product update error:', error);
    }
  };

  if (!open || !product) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='max-h-[90vh] w-full max-w-3xl overflow-y-auto'>
        <AppCard.Root>
          <AppCard.Header>
            <div className='flex items-center justify-between'>
              <AppCard.Title>Edit Product</AppCard.Title>
              <AppButton variant='ghost' size='icon' onClick={() => onOpenChange(false)} disabled={mutate.isPending}>
                <X className='size-4' />
              </AppButton>
            </div>
            <AppCard.Description>Update the fields you want to change</AppCard.Description>
          </AppCard.Header>
          <AppCard.Content>
            <form onSubmit={(e) => void handleSubmit(e)} className='space-y-6'>
              <div className='space-y-2'>
                <AppLabel htmlFor='name'>Product Name</AppLabel>
                <AppInput
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={mutate.isPending}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className='text-destructive text-sm'>{errors.name}</p>}
              </div>

              <div className='space-y-2'>
                <AppLabel htmlFor='description'>Description</AppLabel>
                <textarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={mutate.isPending}
                  rows={4}
                  className={`border-input placeholder:text-muted-foreground flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${errors.description ? 'border-destructive' : ''}`}
                />
                {errors.description && <p className='text-destructive text-sm'>{errors.description}</p>}
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <AppLabel htmlFor='price'>Price</AppLabel>
                  <AppInput
                    id='price'
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={mutate.isPending}
                    min='0'
                    step='0.01'
                    className={errors.price ? 'border-destructive' : ''}
                  />
                  {errors.price && <p className='text-destructive text-sm'>{errors.price}</p>}
                </div>
                <div className='space-y-2'>
                  <AppLabel htmlFor='stock'>Stock</AppLabel>
                  <AppInput
                    id='stock'
                    type='number'
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    disabled={mutate.isPending}
                    min='0'
                    className={errors.stock ? 'border-destructive' : ''}
                  />
                  {errors.stock && <p className='text-destructive text-sm'>{errors.stock}</p>}
                </div>
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <AppLabel htmlFor='category'>Category</AppLabel>
                  <AppInput
                    id='category'
                    type='text'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={mutate.isPending}
                    className={errors.category ? 'border-destructive' : ''}
                  />
                  {errors.category && <p className='text-destructive text-sm'>{errors.category}</p>}
                </div>
                <div className='space-y-2'>
                  <AppLabel htmlFor='discount'>Discount (%)</AppLabel>
                  <AppInput
                    id='discount'
                    type='number'
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    disabled={mutate.isPending}
                    min='0'
                    max='100'
                    className={errors.discount ? 'border-destructive' : ''}
                  />
                  {errors.discount && <p className='text-destructive text-sm'>{errors.discount}</p>}
                </div>
              </div>

              {/* Existing visuals */}
              <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                  <p className='text-muted-foreground mb-2 text-sm'>Current thumbnail</p>
                  <div className='border-border relative size-32 overflow-hidden rounded-lg border'>
                    <img
                      src={product.thumbnailUrl || (product.images?.[0] ?? '/images/shopping.png')}
                      alt='Current thumbnail'
                      className='size-full object-cover'
                    />
                  </div>
                </div>
                <div>
                  <p className='text-muted-foreground mb-2 text-sm'>Current images</p>
                  <div className='grid grid-cols-3 gap-2'>
                    {(product.images ?? []).slice(0, 6).map((img, i) => (
                      <div key={i} className='border-border relative aspect-square overflow-hidden rounded-lg border'>
                        <img src={img} alt={`Current ${i + 1}`} className='size-full object-cover' />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Replace images (optional) */}
              <div className='space-y-2'>
                <AppLabel htmlFor='images'>Replace Images (optional)</AppLabel>
                <div className='flex flex-col gap-4'>
                  <input
                    ref={imagesInputRef}
                    id='images'
                    type='file'
                    accept='image/*'
                    multiple
                    onChange={handleImagesChange}
                    disabled={mutate.isPending}
                    className='hidden'
                  />
                  <AppButton
                    type='button'
                    variant='outline'
                    onClick={() => imagesInputRef.current?.click()}
                    disabled={mutate.isPending}
                    className='w-full'>
                    <Upload className='size-4' />
                    {newImages.length > 0 ? `${newImages.length} images selected` : 'Upload New Images'}
                  </AppButton>
                  {imagePreviews.length > 0 && (
                    <div className='grid grid-cols-3 gap-4'>
                      {imagePreviews.map((preview, index) => (
                        <div
                          key={index}
                          className='border-border relative aspect-square overflow-hidden rounded-lg border-2'>
                          <img src={preview} alt={`New ${index + 1}`} className='size-full object-cover' />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.images && <p className='text-destructive text-sm'>{errors.images}</p>}
              </div>

              {/* Replace thumbnail (optional) */}
              <div className='space-y-2'>
                <AppLabel htmlFor='thumbnail'>Replace Thumbnail (optional)</AppLabel>
                <div className='flex flex-col gap-4'>
                  <input
                    ref={thumbnailInputRef}
                    id='thumbnail'
                    type='file'
                    accept='image/*'
                    onChange={handleThumbnailChange}
                    disabled={mutate.isPending}
                    className='hidden'
                  />
                  <AppButton
                    type='button'
                    variant='outline'
                    onClick={() => thumbnailInputRef.current?.click()}
                    disabled={mutate.isPending}
                    className='w-full'>
                    <Upload className='size-4' />
                    {newThumbnail ? 'Change Thumbnail' : 'Upload New Thumbnail'}
                  </AppButton>
                  {thumbnailPreview && (
                    <div className='flex justify-center'>
                      <div className='border-border relative size-32 overflow-hidden rounded-lg border-2'>
                        <img src={thumbnailPreview} alt='New thumbnail' className='size-full object-cover' />
                      </div>
                    </div>
                  )}
                </div>
                {errors.thumbnail && <p className='text-destructive text-sm'>{errors.thumbnail}</p>}
              </div>

              <div className='flex justify-end gap-4 pt-4'>
                <AppButton
                  type='button'
                  variant='outline'
                  onClick={() => onOpenChange(false)}
                  disabled={mutate.isPending}>
                  Cancel
                </AppButton>
                <AppButton type='submit' disabled={mutate.isPending} className='min-w-[140px]'>
                  {mutate.isPending ? (
                    <>
                      <Loader2 className='size-4 animate-spin' />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
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
