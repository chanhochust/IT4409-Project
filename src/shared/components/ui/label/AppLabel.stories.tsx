import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppLabel } from './AppLabel';
import { AppInput } from '../input/AppInput';

const meta = {
  component: AppLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Label',
} satisfies Meta<typeof AppLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <AppLabel>Email</AppLabel>
      <AppInput type='email' placeholder='Email' />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <AppLabel className='text-muted-foreground'>Disabled Label</AppLabel>
      <AppInput type='text' placeholder='Disabled' disabled />
    </div>
  ),
};
