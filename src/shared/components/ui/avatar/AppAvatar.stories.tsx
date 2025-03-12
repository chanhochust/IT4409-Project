import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppAvatar } from './AppAvatar';

const meta = {
  component: AppAvatar.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Avatar',
} satisfies Meta<typeof AppAvatar.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppAvatar.Root>
      <AppAvatar.Image src='https://github.com/shadcn.png' alt='User Avatar' />
      <AppAvatar.Fallback>JD</AppAvatar.Fallback>
    </AppAvatar.Root>
  ),
};

export const Fallback: Story = {
  render: () => (
    <AppAvatar.Root>
      <AppAvatar.Image src='' alt='Fallback Avatar' />
      <AppAvatar.Fallback>JD</AppAvatar.Fallback>
    </AppAvatar.Root>
  ),
};

export const Large: Story = {
  render: () => (
    <AppAvatar.Root className='h-16 w-16'>
      <AppAvatar.Image src='https://github.com/shadcn.png' alt='Large Avatar' />
      <AppAvatar.Fallback>JD</AppAvatar.Fallback>
    </AppAvatar.Root>
  ),
};
