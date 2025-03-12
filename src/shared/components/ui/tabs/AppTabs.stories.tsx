import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppTabs } from './AppTabs';

const meta = {
  component: AppTabs.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof AppTabs.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppTabs.Root defaultValue='account' className='w-[400px]'>
      <AppTabs.List>
        <AppTabs.Trigger value='account'>Account</AppTabs.Trigger>
        <AppTabs.Trigger value='password'>Password</AppTabs.Trigger>
      </AppTabs.List>
      <AppTabs.Content value='account'>
        Make changes to your account here. Click save when you&apos;re done.
      </AppTabs.Content>
      <AppTabs.Content value='password'>
        Change your password here. After saving, you&apos;ll be logged out.
      </AppTabs.Content>
    </AppTabs.Root>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <AppTabs.Root defaultValue='profile' className='w-[400px]'>
      <AppTabs.List>
        <AppTabs.Trigger value='profile'>Profile</AppTabs.Trigger>
        <AppTabs.Trigger value='settings'>Settings</AppTabs.Trigger>
      </AppTabs.List>
      <AppTabs.Content value='profile'>View and update your profile information.</AppTabs.Content>
      <AppTabs.Content value='settings'>Manage your account settings and preferences.</AppTabs.Content>
    </AppTabs.Root>
  ),
};
