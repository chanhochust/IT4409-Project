import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { AppPagination } from './AppPagination';

const meta = {
  component: AppPagination.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof AppPagination.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppPagination.Root>
      <AppPagination.Content>
        <AppPagination.Previous href='#' />
        <AppPagination.Item>
          <AppPagination.Link href='#'>1</AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Link href='#'>2</AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Ellipsis />
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Link href='#'>10</AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Next href='#' />
      </AppPagination.Content>
    </AppPagination.Root>
  ),
};

export const ActivePage: Story = {
  render: () => (
    <AppPagination.Root>
      <AppPagination.Content>
        <AppPagination.Previous href='#' />
        <AppPagination.Item>
          <AppPagination.Link href='#'>1</AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Link href='#' isActive>
            2
          </AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Link href='#'>3</AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Next href='#' />
      </AppPagination.Content>
    </AppPagination.Root>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <AppPagination.Root>
      <AppPagination.Content>
        <AppPagination.Previous href='#' />
        <AppPagination.Item>
          <AppPagination.Link href='#'>1</AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Ellipsis />
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Link href='#'>5</AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Link href='#' isActive>
            6
          </AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Link href='#'>7</AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Ellipsis />
        </AppPagination.Item>
        <AppPagination.Item>
          <AppPagination.Link href='#'>10</AppPagination.Link>
        </AppPagination.Item>
        <AppPagination.Next href='#' />
      </AppPagination.Content>
    </AppPagination.Root>
  ),
};
