import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppDialog } from './AppDialog';
import { AppButton } from '../button/AppButton';
import { AppInput } from '../input/AppInput';
import { AppLabel } from '../label/AppLabel';

const meta = {
  component: AppDialog.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Dialog',
} satisfies Meta<typeof AppDialog.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppDialog.Root>
      <AppDialog.Trigger asChild>
        <AppButton variant='outline'>Edit Profile</AppButton>
      </AppDialog.Trigger>
      <AppDialog.Content>
        <AppDialog.Header>
          <AppDialog.Title>Edit Profile</AppDialog.Title>
          <AppDialog.Description>
            Make changes to your profile here. Click save when you&apos;re done.
          </AppDialog.Description>
        </AppDialog.Header>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <AppLabel className='text-right'>Name</AppLabel>
            <AppInput id='name' defaultValue='Pedro Duarte' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <AppLabel className='text-right'>Username</AppLabel>
            <AppInput id='username' defaultValue='@peduarte' className='col-span-3' />
          </div>
        </div>
        <AppDialog.Footer>
          <AppDialog.Close asChild>
            <AppButton type='button' variant='secondary'>
              Close
            </AppButton>
          </AppDialog.Close>
          <AppButton type='submit'>Save changes</AppButton>
        </AppDialog.Footer>
      </AppDialog.Content>
    </AppDialog.Root>
  ),
};

export const LongContent: Story = {
  render: () => (
    <AppDialog.Root>
      <AppDialog.Trigger asChild>
        <AppButton variant='outline'>Open Long Dialog</AppButton>
      </AppDialog.Trigger>
      <AppDialog.Content>
        <AppDialog.Header>
          <AppDialog.Title>Long Content Dialog</AppDialog.Title>
          <AppDialog.Description>This dialog demonstrates handling of longer content.</AppDialog.Description>
        </AppDialog.Header>
        <div className='p-4'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </div>
        <AppDialog.Footer>
          <AppDialog.Close asChild>
            <AppButton variant='secondary'>Close</AppButton>
          </AppDialog.Close>
        </AppDialog.Footer>
      </AppDialog.Content>
    </AppDialog.Root>
  ),
};
