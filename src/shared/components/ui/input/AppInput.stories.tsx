import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppInput } from './AppInput';
import { AppLabel } from '../label/AppLabel';

const meta = {
  component: AppInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof AppInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <AppLabel>Email</AppLabel>
      <AppInput type='email' placeholder='Enter your email' />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <AppLabel className='text-muted-foreground'>Disabled Input</AppLabel>
      <AppInput type='text' placeholder='Disabled input' disabled />
    </div>
  ),
};

export const Password: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <AppLabel>Password</AppLabel>
      <AppInput type='password' placeholder='Enter your password' />
    </div>
  ),
};
