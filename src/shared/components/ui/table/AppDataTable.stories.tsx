import type { Meta, StoryObj } from '@storybook/react';
import { createColumnHelper } from '@tanstack/react-table';

import { AppDataTable } from './AppDataTable';

// Define data type
interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  lastLogin: string;
}

// Status styles
const statusStyles: Record<Person['status'], string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

// Sample data
const data: Person[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 32,
    status: 'active',
    role: 'Admin',
    lastLogin: '2023-08-15T10:30:00',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    age: 28,
    status: 'active',
    role: 'Editor',
    lastLogin: '2023-08-14T14:45:00',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    age: 41,
    status: 'inactive',
    role: 'Viewer',
    lastLogin: '2023-08-10T09:15:00',
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@example.com',
    age: 36,
    status: 'active',
    role: 'Editor',
    lastLogin: '2023-08-13T16:20:00',
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    age: 45,
    status: 'inactive',
    role: 'Viewer',
    lastLogin: '2023-08-05T11:45:00',
  },
];

const meta: Meta<typeof AppDataTable> = {
  title: 'Components/DataTable',
  component: AppDataTable,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'object' },
    searchPlaceholder: { control: 'text' },
    totalItems: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof AppDataTable<Person>>;

export const Default: Story = {
  render: (args) => {
    // Create column helper for type-safe column definitions
    const columnHelper = createColumnHelper<Person>();

    // Define columns with proper typing
    const columns = [
      columnHelper.accessor('firstName', {
        header: 'First Name',
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor('lastName', {
        header: 'Last Name',
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor('age', {
        header: 'Age',
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const value = info.getValue();
          return (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[value]}`}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </span>
          );
        },
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: (info) => info.getValue(),
        enableSorting: true,
        enableColumnFilter: true,
      }),
      columnHelper.accessor('lastLogin', {
        header: 'Last Login',
        cell: (info) => new Date(info.getValue()).toLocaleString(),
        enableSorting: true,
        enableColumnFilter: true,
      }),
    ];

    return (
      <div className='container mx-auto py-6'>
        <h1 className='mb-6 text-2xl font-bold'>Data Table Example</h1>
        <AppDataTable
          {...args}
          columns={columns}
          data={args.data || data}
          searchPlaceholder={args.searchPlaceholder || 'Search by name, email, role...'}
        />
      </div>
    );
  },
  args: {
    data: data,
    searchPlaceholder: 'Search by name, email, role...',
    totalItems: 5,
  },
};

export const LargeDataSet: Story = {
  render: Default.render,
  args: {
    data: [
      ...data,
      {
        id: '6',
        firstName: 'Emily',
        lastName: 'Jones',
        email: 'emily.jones@example.com',
        age: 29,
        status: 'active',
        role: 'Admin',
        lastLogin: '2023-08-14T08:30:00',
      },
      {
        id: '7',
        firstName: 'Daniel',
        lastName: 'Miller',
        email: 'daniel.miller@example.com',
        age: 33,
        status: 'pending',
        role: 'Editor',
        lastLogin: '2023-08-12T13:15:00',
      },
    ],
    searchPlaceholder: 'Search users...',
    totalItems: 7,
  },
};

export const EmptyDataSet: Story = {
  render: Default.render,
  args: {
    data: [],
    searchPlaceholder: 'No data available',
    totalItems: 0,
  },
};
