import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppDrawer } from './AppDrawer';
import { AppButton } from '../button/AppButton';
import { AppInput } from '../input/AppInput';
import { AppLabel } from '../label/AppLabel';

const meta = {
  component: AppDrawer.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Drawer',
} satisfies Meta<typeof AppDrawer.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppDrawer.Root>
      <AppDrawer.Trigger asChild>
        <AppButton variant='outline'>Open Drawer</AppButton>
      </AppDrawer.Trigger>
      <AppDrawer.Content>
        <AppDrawer.Header>
          <AppDrawer.Title>Edit Profile</AppDrawer.Title>
          <AppDrawer.Description>Make changes to your profile here.</AppDrawer.Description>
        </AppDrawer.Header>
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
        <AppDrawer.Footer>
          <AppDrawer.Close asChild>
            <AppButton type='button' variant='secondary'>
              Cancel
            </AppButton>
          </AppDrawer.Close>
          <AppButton type='submit'>Save changes</AppButton>
        </AppDrawer.Footer>
      </AppDrawer.Content>
    </AppDrawer.Root>
  ),
};

export const LongContent: Story = {
  render: () => (
    <AppDrawer.Root>
      <AppDrawer.Trigger asChild>
        <AppButton variant='outline'>Open Long Drawer</AppButton>
      </AppDrawer.Trigger>
      <AppDrawer.Content>
        <AppDrawer.Header>
          <AppDrawer.Title>Long Content Drawer</AppDrawer.Title>
          <AppDrawer.Description>This drawer demonstrates handling of longer content.</AppDrawer.Description>
        </AppDrawer.Header>
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
        <AppDrawer.Footer>
          <AppDrawer.Close asChild>
            <AppButton variant='secondary'>Close</AppButton>
          </AppDrawer.Close>
        </AppDrawer.Footer>
      </AppDrawer.Content>
    </AppDrawer.Root>
  ),
};
