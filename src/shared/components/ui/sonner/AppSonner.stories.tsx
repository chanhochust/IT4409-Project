import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'sonner';

import { Toaster } from './AppSonner';
import { AppButton } from '../button/AppButton';

const meta = {
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Toaster',
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToasterDemo = () => {
  return (
    <div className='flex flex-col space-y-4'>
      <AppButton onClick={() => toast('Hello, World!')} variant='outline'>
        Show Simple Toast
      </AppButton>

      <AppButton
        onClick={() =>
          toast.success('Success', {
            description: 'Your action was completed successfully.',
          })
        }
        variant='outline'>
        Show Success Toast
      </AppButton>

      <AppButton
        onClick={() =>
          toast.error('Error', {
            description: 'Something went wrong.',
          })
        }
        variant='outline'>
        Show Error Toast
      </AppButton>

      <AppButton
        onClick={() =>
          toast.info('Information', {
            description: 'Here is some additional information.',
          })
        }
        variant='outline'>
        Show Info Toast
      </AppButton>

      <AppButton
        onClick={() =>
          toast.warning('Warning', {
            description: 'Proceed with caution.',
          })
        }
        variant='outline'>
        Show Warning Toast
      </AppButton>

      <Toaster />
    </div>
  );
};

export const Default: Story = {
  render: () => <ToasterDemo />,
};
