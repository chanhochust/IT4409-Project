import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppAccordion } from './AppAccordion';

const meta = {
  component: AppAccordion.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Accordion',
} satisfies Meta<typeof AppAccordion.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: () => (
    <AppAccordion.Root type='single' collapsible className='w-full max-w-md'>
      <AppAccordion.Item value='item-1'>
        <AppAccordion.Trigger>Is it accessible?</AppAccordion.Trigger>
        <AppAccordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</AppAccordion.Content>
      </AppAccordion.Item>
      <AppAccordion.Item value='item-2'>
        <AppAccordion.Trigger>Is it styled?</AppAccordion.Trigger>
        <AppAccordion.Content>
          Yes. It comes with default styles that matches the other components.
        </AppAccordion.Content>
      </AppAccordion.Item>
    </AppAccordion.Root>
  ),
};

export const MultipleOpen: Story = {
  args: {
    type: 'multiple',
  },
  render: () => (
    <AppAccordion.Root type='multiple' className='w-full max-w-md'>
      <AppAccordion.Item value='item-1'>
        <AppAccordion.Trigger>First Section</AppAccordion.Trigger>
        <AppAccordion.Content>Content for the first section.</AppAccordion.Content>
      </AppAccordion.Item>
      <AppAccordion.Item value='item-2'>
        <AppAccordion.Trigger>Second Section</AppAccordion.Trigger>
        <AppAccordion.Content>Content for the second section.</AppAccordion.Content>
      </AppAccordion.Item>
    </AppAccordion.Root>
  ),
};
