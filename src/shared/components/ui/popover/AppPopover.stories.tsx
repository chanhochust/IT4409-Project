import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppPopover } from './AppPopover';
import { AppButton } from '../button/AppButton';
import { AppInput } from '../input/AppInput';
import { AppLabel } from '../label/AppLabel';

const meta = {
  component: AppPopover.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Popover',
} satisfies Meta<typeof AppPopover.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppPopover.Root>
      <AppPopover.Trigger asChild>
        <AppButton variant='outline'>Open Popover</AppButton>
      </AppPopover.Trigger>
      <AppPopover.Content className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <AppLabel>Dimensions</AppLabel>
            <p className='text-muted-foreground text-sm'>Set the dimensions for the viewport.</p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <AppLabel>Width</AppLabel>
              <AppInput type='number' defaultValue='100' className='col-span-2 h-8' />
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <AppLabel>Height</AppLabel>
              <AppInput type='number' defaultValue='100' className='col-span-2 h-8' />
            </div>
          </div>
        </div>
      </AppPopover.Content>
    </AppPopover.Root>
  ),
};
