import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';

import { AppBreadcrumb } from './AppBreadcrumb';

const meta = {
  component: AppBreadcrumb.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Breadcrumb',
} satisfies Meta<typeof AppBreadcrumb.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppBreadcrumb.Root>
      <AppBreadcrumb.List>
        <AppBreadcrumb.Item>
          <AppBreadcrumb.Link href='/'>Home</AppBreadcrumb.Link>
        </AppBreadcrumb.Item>
        <AppBreadcrumb.Separator />
        <AppBreadcrumb.Item>
          <AppBreadcrumb.Link href='/components'>Components</AppBreadcrumb.Link>
        </AppBreadcrumb.Item>
        <AppBreadcrumb.Separator />
        <AppBreadcrumb.Item>
          <AppBreadcrumb.Page>Breadcrumb</AppBreadcrumb.Page>
        </AppBreadcrumb.Item>
      </AppBreadcrumb.List>
    </AppBreadcrumb.Root>
  ),
};

export const WithNextLink: Story = {
  render: () => (
    <AppBreadcrumb.Root>
      <AppBreadcrumb.List>
        <AppBreadcrumb.Item>
          <AppBreadcrumb.Link href='/' asChild>
            <Link href='/'>Home</Link>
          </AppBreadcrumb.Link>
        </AppBreadcrumb.Item>
        <AppBreadcrumb.Separator />
        <AppBreadcrumb.Item>
          <AppBreadcrumb.Link href='/components' asChild>
            <Link href='/components'>Components</Link>
          </AppBreadcrumb.Link>
        </AppBreadcrumb.Item>
        <AppBreadcrumb.Separator />
        <AppBreadcrumb.Item>
          <AppBreadcrumb.Page>Breadcrumb</AppBreadcrumb.Page>
        </AppBreadcrumb.Item>
      </AppBreadcrumb.List>
    </AppBreadcrumb.Root>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <AppBreadcrumb.Root>
      <AppBreadcrumb.List>
        <AppBreadcrumb.Item>
          <AppBreadcrumb.Link href='/'>Home</AppBreadcrumb.Link>
        </AppBreadcrumb.Item>
        <AppBreadcrumb.Separator />
        <AppBreadcrumb.Item>
          <AppBreadcrumb.Ellipsis />
        </AppBreadcrumb.Item>
        <AppBreadcrumb.Separator />
        <AppBreadcrumb.Item>
          <AppBreadcrumb.Link href='/components'>Components</AppBreadcrumb.Link>
        </AppBreadcrumb.Item>
        <AppBreadcrumb.Separator />
        <AppBreadcrumb.Item>
          <AppBreadcrumb.Page>Breadcrumb</AppBreadcrumb.Page>
        </AppBreadcrumb.Item>
      </AppBreadcrumb.List>
    </AppBreadcrumb.Root>
  ),
};
