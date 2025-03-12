import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppSkeleton } from './AppSkeleton';
import { AppCard } from '../card/AppCard';

const meta = {
  component: AppSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Skeleton',
} satisfies Meta<typeof AppSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='flex items-center space-x-4'>
      <AppSkeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <AppSkeleton className='h-4 w-[250px]' />
        <AppSkeleton className='h-4 w-[200px]' />
      </div>
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <AppCard.Root className='w-[350px]'>
      <AppCard.Header>
        <AppSkeleton className='h-6 w-[200px]' />
        <AppSkeleton className='h-4 w-[250px]' />
      </AppCard.Header>
      <AppCard.Content>
        <AppSkeleton className='h-[100px] w-full' />
      </AppCard.Content>
      <AppCard.Footer>
        <AppSkeleton className='h-10 w-[100px]' />
        <AppSkeleton className='h-10 w-[100px]' />
      </AppCard.Footer>
    </AppCard.Root>
  ),
};
