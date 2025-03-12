import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppSwitch } from './AppSwitch';
import { AppLabel } from '../label/AppLabel';

const meta = {
  component: AppSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Switch',
} satisfies Meta<typeof AppSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultSwitch = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className='flex items-center space-x-2'>
      <AppSwitch checked={checked} onCheckedChange={setChecked} />
      <AppLabel>Notifications</AppLabel>
    </div>
  );
};

const DisabledSwitch = () => (
  <div className='flex items-center space-x-2'>
    <AppSwitch disabled />
    <AppLabel className='text-muted-foreground'>Disabled Switch</AppLabel>
  </div>
);

const DefaultCheckedSwitch = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div className='flex items-center space-x-2'>
      <AppSwitch checked={checked} onCheckedChange={setChecked} />
      <AppLabel>Dark Mode</AppLabel>
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultSwitch />,
};

export const Disabled: Story = {
  render: () => <DisabledSwitch />,
};

export const DefaultChecked: Story = {
  render: () => <DefaultCheckedSwitch />,
};
