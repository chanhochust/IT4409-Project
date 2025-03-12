import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppCard } from './AppCard';
import { AppButton } from '../button/AppButton';

const meta = {
  component: AppCard.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof AppCard.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppCard.Root className='w-[350px]'>
      <AppCard.Header>
        <AppCard.Title>Card Title</AppCard.Title>
        <AppCard.Description>Card description goes here.</AppCard.Description>
      </AppCard.Header>
      <AppCard.Content>
        <p>This is the main content of the card.</p>
      </AppCard.Content>
      <AppCard.Footer className='flex gap-2'>
        <AppButton variant='outline'>Cancel</AppButton>
        <AppButton>Submit</AppButton>
      </AppCard.Footer>
    </AppCard.Root>
  ),
};

export const Simple: Story = {
  render: () => (
    <AppCard.Root className='w-[250px]'>
      <AppCard.Header>
        <AppCard.Title>Simple Card</AppCard.Title>
      </AppCard.Header>
      <AppCard.Content>
        <p>Minimal card with just a title and content.</p>
      </AppCard.Content>
    </AppCard.Root>
  ),
};
