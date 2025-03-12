import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { AppForm } from './AppForm';
import { AppInput } from '../input/AppInput';
import { AppButton } from '../button/AppButton';

const meta = {
  component: AppForm.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Form',
} satisfies Meta<typeof AppForm.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
});

const DefaultForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
    mode: 'onBlur',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <AppForm.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-96 space-y-4'>
        <AppForm.Field
          control={form.control}
          name='username'
          render={({ field }) => (
            <AppForm.Item>
              <AppForm.Label>Username</AppForm.Label>
              <AppForm.Control>
                <AppInput placeholder='Enter username' {...field} />
              </AppForm.Control>
              <AppForm.Description>This is your public display name.</AppForm.Description>
              <AppForm.Message />
            </AppForm.Item>
          )}
        />
        <AppForm.Field
          control={form.control}
          name='email'
          render={({ field }) => (
            <AppForm.Item>
              <AppForm.Label>Email</AppForm.Label>
              <AppForm.Control>
                <AppInput placeholder='Enter email' type='email' {...field} />
              </AppForm.Control>
              <AppForm.Description>We will never share your email.</AppForm.Description>
              <AppForm.Message />
            </AppForm.Item>
          )}
        />
        <AppButton type='submit'>Submit</AppButton>
      </form>
    </AppForm.Root>
  );
};

const WithErrorsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'a',
      email: 'invalid-email',
    },
    mode: 'onBlur',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <AppForm.Root {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-96 space-y-4'>
        <AppForm.Field
          control={form.control}
          name='username'
          render={({ field }) => (
            <AppForm.Item>
              <AppForm.Label>Username</AppForm.Label>
              <AppForm.Control>
                <AppInput placeholder='Enter username' {...field} />
              </AppForm.Control>
              <AppForm.Description>This is your public display name.</AppForm.Description>
              <AppForm.Message />
            </AppForm.Item>
          )}
        />
        <AppForm.Field
          control={form.control}
          name='email'
          render={({ field }) => (
            <AppForm.Item>
              <AppForm.Label>Email</AppForm.Label>
              <AppForm.Control>
                <AppInput placeholder='Enter email' type='email' {...field} />
              </AppForm.Control>
              <AppForm.Description>We will never share your email.</AppForm.Description>
              <AppForm.Message />
            </AppForm.Item>
          )}
        />
        <AppButton type='submit'>Submit</AppButton>
      </form>
    </AppForm.Root>
  );
};

export const Default: Story = {
  args: {} as never,
  render: () => <DefaultForm />,
};

export const WithErrors: Story = {
  args: {} as never,
  render: () => <WithErrorsForm />,
};
