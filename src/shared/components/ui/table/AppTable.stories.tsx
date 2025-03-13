import type { Meta, StoryObj } from '@storybook/react';
import { AppTable } from './AppTable';

const meta: Meta<typeof AppTable.Root> = {
  title: 'Components/Table',
  component: AppTable.Root,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof AppTable.Root>;

export const Default: Story = {
  render: (args) => (
    <AppTable.Root {...args}>
      <AppTable.Header>
        <tr>
          <AppTable.Head>Name</AppTable.Head>
          <AppTable.Head>Email</AppTable.Head>
          <AppTable.Head>Role</AppTable.Head>
        </tr>
      </AppTable.Header>
      <AppTable.Body>
        <AppTable.Row>
          <AppTable.Cell>John Doe</AppTable.Cell>
          <AppTable.Cell>john.doe@example.com</AppTable.Cell>
          <AppTable.Cell>Admin</AppTable.Cell>
        </AppTable.Row>
        <AppTable.Row>
          <AppTable.Cell>Jane Smith</AppTable.Cell>
          <AppTable.Cell>jane.smith@example.com</AppTable.Cell>
          <AppTable.Cell>Editor</AppTable.Cell>
        </AppTable.Row>
      </AppTable.Body>
      <AppTable.Footer>
        <tr>
          <AppTable.Cell colSpan={3}>Total Users: 2</AppTable.Cell>
        </tr>
      </AppTable.Footer>
      <AppTable.Caption>User Management Table</AppTable.Caption>
    </AppTable.Root>
  ),
  args: {},
};

export const WithHoverState: Story = {
  render: () => (
    <AppTable.Root>
      <AppTable.Header>
        <tr>
          <AppTable.Head>Product</AppTable.Head>
          <AppTable.Head>Price</AppTable.Head>
          <AppTable.Head>Stock</AppTable.Head>
        </tr>
      </AppTable.Header>
      <AppTable.Body>
        <AppTable.Row>
          <AppTable.Cell>Laptop</AppTable.Cell>
          <AppTable.Cell>$999.99</AppTable.Cell>
          <AppTable.Cell>15</AppTable.Cell>
        </AppTable.Row>
        <AppTable.Row>
          <AppTable.Cell>Smartphone</AppTable.Cell>
          <AppTable.Cell>$599.99</AppTable.Cell>
          <AppTable.Cell>25</AppTable.Cell>
        </AppTable.Row>
        <AppTable.Row>
          <AppTable.Cell>Tablet</AppTable.Cell>
          <AppTable.Cell>$399.99</AppTable.Cell>
          <AppTable.Cell>10</AppTable.Cell>
        </AppTable.Row>
      </AppTable.Body>
    </AppTable.Root>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <AppTable.Root>
      <AppTable.Header>
        <tr>
          <AppTable.Head>Name</AppTable.Head>
          <AppTable.Head>Status</AppTable.Head>
          <AppTable.Head>Actions</AppTable.Head>
        </tr>
      </AppTable.Header>
      <AppTable.Body>
        <AppTable.Row>
          <AppTable.Cell colSpan={3} className='muted-foreground text-center'>
            No data available
          </AppTable.Cell>
        </AppTable.Row>
      </AppTable.Body>
    </AppTable.Root>
  ),
};

export const SelectedState: Story = {
  render: () => (
    <AppTable.Root>
      <AppTable.Header>
        <tr>
          <AppTable.Head>Name</AppTable.Head>
          <AppTable.Head>Department</AppTable.Head>
          <AppTable.Head>Status</AppTable.Head>
        </tr>
      </AppTable.Header>
      <AppTable.Body>
        <AppTable.Row data-state='selected'>
          <AppTable.Cell>Emily Johnson</AppTable.Cell>
          <AppTable.Cell>Marketing</AppTable.Cell>
          <AppTable.Cell>Active</AppTable.Cell>
        </AppTable.Row>
        <AppTable.Row>
          <AppTable.Cell>Michael Brown</AppTable.Cell>
          <AppTable.Cell>Sales</AppTable.Cell>
          <AppTable.Cell>Inactive</AppTable.Cell>
        </AppTable.Row>
      </AppTable.Body>
    </AppTable.Root>
  ),
};

export const ComplexTable: Story = {
  render: () => (
    <AppTable.Root>
      <AppTable.Caption>Quarterly Sales Report</AppTable.Caption>
      <AppTable.Header>
        <tr>
          <AppTable.Head>Quarter</AppTable.Head>
          <AppTable.Head>Revenue</AppTable.Head>
          <AppTable.Head>Expenses</AppTable.Head>
          <AppTable.Head>Profit</AppTable.Head>
        </tr>
      </AppTable.Header>
      <AppTable.Body>
        <AppTable.Row>
          <AppTable.Cell>Q1 2023</AppTable.Cell>
          <AppTable.Cell>$250,000</AppTable.Cell>
          <AppTable.Cell>$180,000</AppTable.Cell>
          <AppTable.Cell>$70,000</AppTable.Cell>
        </AppTable.Row>
        <AppTable.Row>
          <AppTable.Cell>Q2 2023</AppTable.Cell>
          <AppTable.Cell>$300,000</AppTable.Cell>
          <AppTable.Cell>$210,000</AppTable.Cell>
          <AppTable.Cell>$90,000</AppTable.Cell>
        </AppTable.Row>
      </AppTable.Body>
      <AppTable.Footer>
        <tr>
          <AppTable.Cell>Total</AppTable.Cell>
          <AppTable.Cell>$550,000</AppTable.Cell>
          <AppTable.Cell>$390,000</AppTable.Cell>
          <AppTable.Cell>$160,000</AppTable.Cell>
        </tr>
      </AppTable.Footer>
    </AppTable.Root>
  ),
};
