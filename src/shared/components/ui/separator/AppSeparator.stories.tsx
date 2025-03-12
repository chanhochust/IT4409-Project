import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppSeparator } from './AppSeparator';

const meta = {
  component: AppSeparator.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Separator',
} satisfies Meta<typeof AppSeparator.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className='w-64'>
      <div>Content Above</div>
      <AppSeparator.Root />
      <div>Content Below</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className='flex h-32 items-center'>
      <div>Left Content</div>
      <AppSeparator.Root orientation='vertical' />
      <div>Right Content</div>
    </div>
  ),
};
