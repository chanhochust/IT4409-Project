import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppTooltip } from './AppTooltip';
import { AppButton } from '../button/AppButton';

const meta = {
  component: AppTooltip.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Tooltip',
} satisfies Meta<typeof AppTooltip.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppTooltip.Root>
      <AppTooltip.Trigger asChild>
        <AppButton variant='outline'>Hover me</AppButton>
      </AppTooltip.Trigger>
      <AppTooltip.Content>
        <p>This is a tooltip</p>
      </AppTooltip.Content>
    </AppTooltip.Root>
  ),
};

export const WithLongText: Story = {
  render: () => (
    <AppTooltip.Root>
      <AppTooltip.Trigger asChild>
        <AppButton variant='secondary'>Long Tooltip</AppButton>
      </AppTooltip.Trigger>
      <AppTooltip.Content>
        <p>This is a longer tooltip with more detailed information about the element.</p>
      </AppTooltip.Content>
    </AppTooltip.Root>
  ),
};
