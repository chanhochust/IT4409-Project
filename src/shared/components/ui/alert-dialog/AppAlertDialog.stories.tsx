import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppAlertDialog } from './AppAlertDialog';
import { AppButton } from '../button/AppButton';

const meta = {
  component: AppAlertDialog.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Alert Dialog',
} satisfies Meta<typeof AppAlertDialog.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppAlertDialog.Root>
      <AppAlertDialog.Trigger asChild>
        <AppButton>Open Alert</AppButton>
      </AppAlertDialog.Trigger>
      <AppAlertDialog.Content>
        <AppAlertDialog.Header>
          <AppAlertDialog.Title>Are you absolutely sure?</AppAlertDialog.Title>
          <AppAlertDialog.Description>
            This action cannot be undone. This will permanently delete your account.
          </AppAlertDialog.Description>
        </AppAlertDialog.Header>
        <AppAlertDialog.Footer>
          <AppAlertDialog.Cancel>Cancel</AppAlertDialog.Cancel>
          <AppAlertDialog.Action>Continue</AppAlertDialog.Action>
        </AppAlertDialog.Footer>
      </AppAlertDialog.Content>
    </AppAlertDialog.Root>
  ),
};

export const WithCustomButtons: Story = {
  render: () => (
    <AppAlertDialog.Root>
      <AppAlertDialog.Trigger asChild>
        <AppButton variant='outline'>Delete Account</AppButton>
      </AppAlertDialog.Trigger>
      <AppAlertDialog.Content>
        <AppAlertDialog.Header>
          <AppAlertDialog.Title>Delete Account</AppAlertDialog.Title>
          <AppAlertDialog.Description>
            Are you sure you want to delete your account? This action is irreversible.
          </AppAlertDialog.Description>
        </AppAlertDialog.Header>
        <AppAlertDialog.Footer>
          <AppAlertDialog.Cancel asChild>
            <AppButton variant='secondary'>No, keep account</AppButton>
          </AppAlertDialog.Cancel>
          <AppAlertDialog.Action asChild>
            <AppButton variant='destructive'>Yes, delete account</AppButton>
          </AppAlertDialog.Action>
        </AppAlertDialog.Footer>
      </AppAlertDialog.Content>
    </AppAlertDialog.Root>
  ),
};
