'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const validImages = images.filter((img) => img && img.trim());
  const displayImages = validImages.length > 0 ? validImages : [null];
  const currentImage = displayImages[currentImageIndex];

  function handlePrevImage() {
    setCurrentImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  }

  function handleNextImage() {
    setCurrentImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  }

  function handleThumbnailClick(index: number) {
    setCurrentImageIndex(index);
  }

  return (
    <div className='space-y-4'>
      {/* Main Gallery */}
      <div className='bg-card border-border relative overflow-hidden rounded-lg border'>
        {currentImage ? (
          <img alt={productName} className='h-96 w-full object-cover' src={currentImage} />
        ) : (
          <div className='bg-muted flex h-96 w-full items-center justify-center'>
            <div className='flex flex-col items-center gap-2'>
              <ImageIcon className='text-muted-foreground h-8 w-8' />
              <span className='text-muted-foreground text-sm'>No image available</span>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        {displayImages.length > 1 && (
          <>
            <button
              className='absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70'
              onClick={handlePrevImage}
              type='button'>
              <ChevronLeft className='h-4 w-4 text-white' />
            </button>
            <button
              className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70'
              onClick={handleNextImage}
              type='button'>
              <ChevronRight className='h-4 w-4 text-white' />
            </button>

            {/* Image Counter */}
            <div className='absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-xs font-medium text-white'>
              {currentImageIndex + 1} / {displayImages.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className='flex gap-2 overflow-x-auto'>
          {displayImages.map((img, index) => (
            <button
              key={index}
              className={`flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                index === currentImageIndex
                  ? 'border-primary ring-primary ring-2'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleThumbnailClick(index)}
              type='button'>
              {img ? (
                <img alt={`${productName} thumbnail ${index + 1}`} className='h-20 w-20 object-cover' src={img} />
              ) : (
                <div className='bg-muted flex h-20 w-20 items-center justify-center'>
                  <ImageIcon className='text-muted-foreground h-4 w-4' />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
