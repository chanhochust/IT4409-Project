import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppSelect } from './AppSelect';
import { AppLabel } from '../label/AppLabel';

const meta = {
  component: AppSelect.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof AppSelect.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <AppLabel>Favorite Fruit</AppLabel>
      <AppSelect.Root>
        <AppSelect.Trigger>
          <AppSelect.Value placeholder='Select a fruit' />
        </AppSelect.Trigger>
        <AppSelect.Content>
          <AppSelect.Group>
            <AppSelect.Label>Fruits</AppSelect.Label>
            <AppSelect.Item value='apple'>Apple</AppSelect.Item>
            <AppSelect.Item value='banana'>Banana</AppSelect.Item>
            <AppSelect.Item value='orange'>Orange</AppSelect.Item>
          </AppSelect.Group>
        </AppSelect.Content>
      </AppSelect.Root>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <AppLabel className='text-muted-foreground'>Disabled Select</AppLabel>
      <AppSelect.Root disabled>
        <AppSelect.Trigger>
          <AppSelect.Value placeholder='Select an option' />
        </AppSelect.Trigger>
        <AppSelect.Content>
          <AppSelect.Group>
            <AppSelect.Label>Options</AppSelect.Label>
            <AppSelect.Item value='option1'>Option 1</AppSelect.Item>
            <AppSelect.Item value='option2'>Option 2</AppSelect.Item>
          </AppSelect.Group>
        </AppSelect.Content>
      </AppSelect.Root>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <AppLabel>Choose a Programming Language</AppLabel>
      <AppSelect.Root>
        <AppSelect.Trigger>
          <AppSelect.Value placeholder='Select a language' />
        </AppSelect.Trigger>
        <AppSelect.Content>
          <AppSelect.Group>
            <AppSelect.Label>Web</AppSelect.Label>
            <AppSelect.Item value='javascript'>JavaScript</AppSelect.Item>
            <AppSelect.Item value='typescript'>TypeScript</AppSelect.Item>
          </AppSelect.Group>
          <AppSelect.Separator />
          <AppSelect.Group>
            <AppSelect.Label>Backend</AppSelect.Label>
            <AppSelect.Item value='python'>Python</AppSelect.Item>
            <AppSelect.Item value='java'>Java</AppSelect.Item>
          </AppSelect.Group>
        </AppSelect.Content>
      </AppSelect.Root>
    </div>
  ),
};
