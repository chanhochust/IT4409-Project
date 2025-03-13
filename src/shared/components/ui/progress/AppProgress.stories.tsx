import type { Meta, StoryObj } from '@storybook/react';

import { AppProgress } from './AppProgress';

const meta = {
  component: AppProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Progress',
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
} satisfies Meta<typeof AppProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Low: Story = {
  args: {
    value: 25,
  },
};

export const High: Story = {
  args: {
    value: 75,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};
