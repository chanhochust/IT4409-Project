import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { CounterPage } from './CounterPage';

// Mock the child components
vi.mock('./components/Counter', () => ({
  Counter: () => <div data-testid='mock-counter'>Mock Counter</div>,
}));

vi.mock('./components/CounterController', () => ({
  CounterController: () => <div data-testid='mock-counter-controller'>Mock Counter Controller</div>,
}));

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the useRerenderCount hook
vi.mock('src/shared/hooks/useRerenderCount', () => ({
  useRerenderCount: vi.fn(),
}));

// Mock tanstack query hooks
vi.mock('src/shared/services/api/queries/useExampleTodo.query', () => ({
  useExampleTodosQuery: () => ({ data: [] }),
}));

vi.mock('src/shared/services/api/mutations/useExampleTodo.mutation', () => ({
  useExampleTodoMutation: () => ({ mutate: vi.fn(), data: null }),
}));

describe('CounterPage', () => {
  it('should render the counter components', () => {
    render(<CounterPage />);

    expect(screen.getByTestId('mock-counter')).toBeInTheDocument();
    expect(screen.getByTestId('mock-counter-controller')).toBeInTheDocument();
    expect(screen.getByText('Navigate to homepage')).toBeInTheDocument();
    expect(screen.getByText(/This counter is global/i)).toBeInTheDocument();
    expect(screen.getByText(/TODO example/i)).toBeInTheDocument();
  });
});
