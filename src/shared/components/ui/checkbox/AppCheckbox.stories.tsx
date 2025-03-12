import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { AppCheckbox } from './AppCheckbox';
import { AppLabel } from '../label/AppLabel';

const meta = {
  component: AppCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof AppCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);

    return (
      <div className='flex items-center space-x-2'>
        <AppCheckbox
          id='default-checkbox'
          checked={checked as CheckboxPrimitive.CheckedState}
          onCheckedChange={setChecked as (checked: CheckboxPrimitive.CheckedState) => void}
        />
        <AppLabel htmlFor='default-checkbox'>Accept terms and conditions</AppLabel>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className='flex items-center space-x-2'>
      <AppCheckbox id='disabled-checkbox' disabled />
      <AppLabel htmlFor='disabled-checkbox' className='text-muted-foreground'>
        Disabled Checkbox
      </AppLabel>
    </div>
  ),
};

export const DefaultChecked: Story = {
  render: () => (
    <div className='flex items-center space-x-2'>
      <AppCheckbox id='default-checked-checkbox' checked />
      <AppLabel htmlFor='default-checked-checkbox'>Subscribe to newsletter</AppLabel>
    </div>
  ),
};
