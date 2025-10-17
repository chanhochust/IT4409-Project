'use client';
import React, { useState } from 'react';

interface ImageItem {
  id: number;
  url: string;
  title: string;
  description: string;
}

const IMAGES: ImageItem[] = [
  {
    id: 1,
    url: 'https://picsum.photos/id/1015/1200/800',
    title: 'Mountains',
    description: 'Morning light over mountain range',
  },
  {
    id: 2,
    url: 'https://picsum.photos/id/1025/1200/800',
    title: 'Puppy',
    description: 'Golden retriever in the field',
  },
  { id: 3, url: 'https://picsum.photos/id/1035/1200/800', title: 'Forest', description: 'Misty pine forest path' },
  { id: 4, url: 'https://picsum.photos/id/1045/1200/800', title: 'Desert', description: 'Dunes and long shadows' },
  { id: 5, url: 'https://picsum.photos/id/1055/1200/800', title: 'Bridge', description: 'City bridge at dusk' },
  { id: 6, url: 'https://picsum.photos/id/1065/1200/800', title: 'Ocean', description: 'Waves breaking on rocks' },
  { id: 7, url: 'https://picsum.photos/id/1074/1200/800', title: 'Flowers', description: 'Wildflowers close-up' },
  { id: 8, url: 'https://picsum.photos/id/1084/1200/800', title: 'Snow', description: 'Cabin in snowy forest' },
];

export default function ImageGalleryExercise() {
  const [current, setCurrent] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const [loading, setLoading] = useState(false);

  const item = current !== null ? IMAGES[current] : undefined;

  function open(index: number) {
    setCurrent(index);
    setZoom(false);
    setLoading(true);
  }

  function close() {
    setCurrent(null);
    setZoom(false);
    setLoading(false);
  }

  function next() {
    if (current === null) return;
    const n = (current + 1) % IMAGES.length;
    setCurrent(n);
    setZoom(false);
    setLoading(true);
  }

  function prev() {
    if (current === null) return;
    const p = (current - 1 + IMAGES.length) % IMAGES.length;
    setCurrent(p);
    setZoom(false);
    setLoading(true);
  }

  function onImageLoaded() {
    setLoading(false);
  }

  function toggleZoom() {
    setZoom(!zoom);
  }

  return (
    <div className='mx-auto max-w-5xl p-6'>
      <h1 className='mb-6 text-2xl font-semibold'>Image Gallery</h1>

      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
        {IMAGES.map((img, i) => (
          <button
            key={img.id}
            onClick={() => open(i)}
            className='group relative aspect-square overflow-hidden rounded-lg border border-gray-200'>
            <img
              src={img.url}
              alt={img.title}
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
              loading='lazy'
            />
            <div className='pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-left'>
              <div className='truncate text-sm font-medium text-white'>{img.title}</div>
            </div>
          </button>
        ))}
      </div>

      {item && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4' onClick={close}>
          <div
            className='relative w-full max-w-5xl'
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <div className='mb-3 flex items-center justify-between text-white'>
              <div className='min-w-0'>
                <div className='truncate text-lg font-semibold'>{item.title}</div>
                <div className='truncate text-sm text-gray-300'>{item.description}</div>
              </div>
              <div className='flex items-center gap-2'>
                <button onClick={toggleZoom} className='rounded-md border border-white/40 px-3 py-1 text-sm'>
                  {zoom ? 'Fit' : 'Zoom'}
                </button>
                <button onClick={close} className='rounded-md border border-white/40 px-3 py-1 text-sm'>
                  Close
                </button>
              </div>
            </div>

            <div className='relative overflow-hidden rounded-lg bg-black/20'>
              {loading && (
                <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center'>
                  <div className='h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                </div>
              )}
              <div className='flex items-center justify-center'>
                <img
                  src={item.url}
                  alt={item.title}
                  onLoad={onImageLoaded}
                  className={
                    zoom
                      ? 'max-h-[85vh] w-auto scale-110 cursor-zoom-out object-contain transition-transform duration-300 select-none sm:max-h-[80vh]'
                      : 'max-h-[85vh] w-auto cursor-zoom-in object-contain transition-transform duration-300 select-none sm:max-h-[80vh]'
                  }
                  draggable={false}
                />
              </div>

              <div className='pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-black/40 to-transparent sm:block' />
              <div className='pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-black/40 to-transparent sm:block' />

              <div className='absolute inset-y-0 left-0 flex items-center'>
                <button
                  onClick={prev}
                  className='m-2 rounded-full bg-white/20 px-3 py-2 text-white backdrop-blur hover:bg-white/30'>
                  ‹
                </button>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center'>
                <button
                  onClick={next}
                  className='m-2 rounded-full bg-white/20 px-3 py-2 text-white backdrop-blur hover:bg-white/30'>
                  ›
                </button>
              </div>
            </div>

            <div className='mt-3 flex items-center justify-center gap-2'>
              {IMAGES.map((img, i) => {
                const active = i === current;
                return (
                  <button
                    key={img.id}
                    onClick={() => open(i)}
                    className={
                      active ? 'h-2 w-2 rounded-full bg-white' : 'h-2 w-2 rounded-full bg-white/50 hover:bg-white/70'
                    }
                    aria-label={'Go to ' + img.title}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
