import type { Meta, StoryObj } from '@storybook/react';

import { AppContextMenu } from './AppContextMenu';

const meta = {
  component: AppContextMenu.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Context Menu',
} satisfies Meta<typeof AppContextMenu.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppContextMenu.Root>
      <AppContextMenu.Trigger>
        <div className='border p-4 text-center'>Right-click here</div>
      </AppContextMenu.Trigger>
      <AppContextMenu.Content>
        <AppContextMenu.Group>
          <AppContextMenu.Label>Actions</AppContextMenu.Label>
          <AppContextMenu.Item>Profile</AppContextMenu.Item>
          <AppContextMenu.Item>Billing</AppContextMenu.Item>
          <AppContextMenu.Item>Team</AppContextMenu.Item>
          <AppContextMenu.Item>Subscription</AppContextMenu.Item>
        </AppContextMenu.Group>
        <AppContextMenu.Separator />
        <AppContextMenu.Group>
          <AppContextMenu.Label>More</AppContextMenu.Label>
          <AppContextMenu.Item>Settings</AppContextMenu.Item>
          <AppContextMenu.Item>Support</AppContextMenu.Item>
          <AppContextMenu.Item>Logout</AppContextMenu.Item>
        </AppContextMenu.Group>
      </AppContextMenu.Content>
    </AppContextMenu.Root>
  ),
};

export const WithSubMenu: Story = {
  render: () => (
    <AppContextMenu.Root>
      <AppContextMenu.Trigger>
        <div className='border p-4 text-center'>Right-click for advanced options</div>
      </AppContextMenu.Trigger>
      <AppContextMenu.Content>
        <AppContextMenu.Group>
          <AppContextMenu.Label>General</AppContextMenu.Label>
          <AppContextMenu.Item>Dashboard</AppContextMenu.Item>
          <AppContextMenu.Sub>
            <AppContextMenu.SubTrigger>Analytics</AppContextMenu.SubTrigger>
            <AppContextMenu.SubContent>
              <AppContextMenu.Item>Overview</AppContextMenu.Item>
              <AppContextMenu.Item>Detailed Report</AppContextMenu.Item>
            </AppContextMenu.SubContent>
          </AppContextMenu.Sub>
        </AppContextMenu.Group>
        <AppContextMenu.Separator />
        <AppContextMenu.Group>
          <AppContextMenu.Label>Advanced</AppContextMenu.Label>
          <AppContextMenu.Item>Configuration</AppContextMenu.Item>
          <AppContextMenu.Item>Integrations</AppContextMenu.Item>
        </AppContextMenu.Group>
      </AppContextMenu.Content>
    </AppContextMenu.Root>
  ),
};
