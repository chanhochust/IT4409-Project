import type { Meta, StoryObj } from '@storybook/react';

import { AppProgress } from './AppProgress';

const meta = {
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
    value: {
      control: { max: 100, min: 0, type: 'range' },
      description: 'The progress value (0-100)',
    },
  },
  component: AppProgress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Progress',
} satisfies Meta<typeof AppProgress>;

export default meta;
type Story = StoryObj<typeof AppProgress>;

export const CustomStyling: Story = {
  args: {
    className: 'h-2 w-[300px] bg-slate-200',
    value: 60,
  },
};
