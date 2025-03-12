import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppDropdown } from './AppDropdown';
import { AppButton } from '../button/AppButton';

const meta = {
  component: AppDropdown.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof AppDropdown.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppDropdown.Root>
      <AppDropdown.Trigger asChild>
        <AppButton variant='outline'>Open Dropdown</AppButton>
      </AppDropdown.Trigger>
      <AppDropdown.Content>
        <AppDropdown.Group>
          <AppDropdown.Label>My Account</AppDropdown.Label>
          <AppDropdown.Item>Profile</AppDropdown.Item>
          <AppDropdown.Item>Billing</AppDropdown.Item>
          <AppDropdown.Item>Team</AppDropdown.Item>
          <AppDropdown.Item>Subscription</AppDropdown.Item>
        </AppDropdown.Group>
        <AppDropdown.Separator />
        <AppDropdown.Group>
          <AppDropdown.Label>Actions</AppDropdown.Label>
          <AppDropdown.Item>Settings</AppDropdown.Item>
          <AppDropdown.Item>Support</AppDropdown.Item>
          <AppDropdown.Item>Logout</AppDropdown.Item>
        </AppDropdown.Group>
      </AppDropdown.Content>
    </AppDropdown.Root>
  ),
};

export const WithSubMenu: Story = {
  render: () => (
    <AppDropdown.Root>
      <AppDropdown.Trigger asChild>
        <AppButton variant='secondary'>Advanced Options</AppButton>
      </AppDropdown.Trigger>
      <AppDropdown.Content>
        <AppDropdown.Group>
          <AppDropdown.Label>General</AppDropdown.Label>
          <AppDropdown.Item>Dashboard</AppDropdown.Item>
          <AppDropdown.Sub>
            <AppDropdown.SubTrigger>Analytics</AppDropdown.SubTrigger>
            <AppDropdown.SubContent>
              <AppDropdown.Item>Overview</AppDropdown.Item>
              <AppDropdown.Item>Detailed Report</AppDropdown.Item>
            </AppDropdown.SubContent>
          </AppDropdown.Sub>
        </AppDropdown.Group>
        <AppDropdown.Separator />
        <AppDropdown.Group>
          <AppDropdown.Label>Advanced</AppDropdown.Label>
          <AppDropdown.Item>Configuration</AppDropdown.Item>
          <AppDropdown.Item>Integrations</AppDropdown.Item>
        </AppDropdown.Group>
      </AppDropdown.Content>
    </AppDropdown.Root>
  ),
};
