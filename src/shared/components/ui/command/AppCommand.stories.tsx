import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppCommand } from './AppCommand';

const meta = {
  component: AppCommand.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Command',
} satisfies Meta<typeof AppCommand.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppCommand.Root className='w-[400px]'>
      <AppCommand.Input placeholder='Type a command or search...' />
      <AppCommand.List>
        <AppCommand.Empty>No results found.</AppCommand.Empty>
        <AppCommand.Group heading='Suggestions'>
          <AppCommand.Item>Calendar</AppCommand.Item>
          <AppCommand.Item>Search Emails</AppCommand.Item>
        </AppCommand.Group>
        <AppCommand.Separator />
        <AppCommand.Group heading='Settings'>
          <AppCommand.Item>Profile</AppCommand.Item>
          <AppCommand.Item>Settings</AppCommand.Item>
        </AppCommand.Group>
      </AppCommand.List>
    </AppCommand.Root>
  ),
};

export const WithSubCommands: Story = {
  render: () => (
    <AppCommand.Root className='w-[400px]'>
      <AppCommand.Input placeholder='Search or type a command...' />
      <AppCommand.List>
        <AppCommand.Group heading='General'>
          <AppCommand.Item>Dashboard</AppCommand.Item>
          <AppCommand.Item>Analytics Overview</AppCommand.Item>
          <AppCommand.Item>Detailed Report</AppCommand.Item>
        </AppCommand.Group>
        <AppCommand.Separator />
        <AppCommand.Group heading='Advanced'>
          <AppCommand.Item>Configuration</AppCommand.Item>
          <AppCommand.Item>Integrations</AppCommand.Item>
        </AppCommand.Group>
      </AppCommand.List>
    </AppCommand.Root>
  ),
};
