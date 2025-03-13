# Storybook in Our Project

## Overview

Storybook is an open-source tool for developing UI components in isolation. It allows developers to build components independently of the main application, making it easier to develop, test, and document UI components. 

Key benefits include:
- **Isolated Development**: Create and showcase components without impacting the main application
- **Live Component Demos**: Demonstrate different states and variations of UI components in a controlled environment
- **Zero Project Impact**: Components and stories exist separately from the main project, ensuring no unintended side effects or changes to the core application
- **Interactive Exploration**: Developers and designers can interact with components without setting up the entire application context

By using Storybook, teams can:
- Develop UI components in complete isolation
- Showcase component variations without modifying the main application
- Provide a living style guide for design systems
- Enable easier collaboration between designers and developers

## Getting Started

### Installation

Storybook is already configured in the project. To start Storybook, run:

```bash
npm run storybook
```

This will launch the Storybook development server, typically at `http://localhost:6006`.

## Creating Stories

### Basic Structure

A Storybook story is a function that describes a specific state of a component. Here's the basic structure based on our `AppAvatar.stories.tsx`:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

// Metadata about the component
const meta = {
  component: ComponentName,
  parameters: {
    layout: 'centered', // Optional: controls the layout of the story
  },
  tags: ['autodocs'], // Automatically generates documentation
  title: 'Components/CategoryName', // Defines the location in Storybook's sidebar
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// Individual stories showcase different states or variations
export const Default: Story = {
  render: () => (
    <ComponentName>
      {/* Component configuration */}
    </ComponentName>
  ),
};
```

### Story Types

1. **Default Story**: Shows the component in its most common state
2. **Variations**: Demonstrate different props, states, or configurations
3. **Edge Cases**: Highlight how the component behaves in unusual scenarios

### Example: Avatar Component Stories

In `AppAvatar.stories.tsx`, we have three stories:

- `Default`: Shows a standard avatar with an image
- `Fallback`: Demonstrates the fallback state when no image is available
- `Large`: Shows a larger version of the avatar

```typescript
export const Default: Story = {
  render: () => (
    <AppAvatar.Root>
      <AppAvatar.Image src='https://github.com/shadcn.png' alt='User Avatar' />
      <AppAvatar.Fallback>JD</AppAvatar.Fallback>
    </AppAvatar.Root>
  ),
};

export const Fallback: Story = {
  render: () => (
    <AppAvatar.Root>
      <AppAvatar.Image src='' alt='Fallback Avatar' />
      <AppAvatar.Fallback>JD</AppAvatar.Fallback>
    </AppAvatar.Root>
  ),
};

export const Large: Story = {
  render: () => (
    <AppAvatar.Root className='h-16 w-16'>
      <AppAvatar.Image src='https://github.com/shadcn.png' alt='Large Avatar' />
      <AppAvatar.Fallback>JD</AppAvatar.Fallback>
    </AppAvatar.Root>
  ),
};
```

## Best Practices

1. **Isolation**: Each story should represent a single state or variation
2. **Clarity**: Use descriptive names for stories
3. **Comprehensive Coverage**: Include stories for different props, states, and edge cases
4. **Use Parameters**: Leverage Storybook parameters for layout, backgrounds, etc.

## Advanced Features

### Controls

You can add interactive controls to modify component props in real-time:

```typescript
export const Customizable: Story = {
  argTypes: {
    size: { 
      control: { 
        type: 'select', 
        options: ['small', 'medium', 'large'] 
      } 
    },
    // More controls...
  },
  args: {
    size: 'medium',
    // Default values
  },
  render: (args) => (
    <ComponentName {...args} />
  ),
};
```

### Decorators

Add global or per-story decorators to wrap components in providers or add styling:

```typescript
const meta = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};
```

## Folder Structure

- Stories should be co-located with components
- Use `.stories.tsx` extension
- Place in the same directory as the component

## Continuous Integration

Storybook can be integrated into CI/CD pipelines to:
- Validate component rendering
- Catch visual regressions
- Generate documentation automatically

## Recommended Reading

- [Storybook Official Documentation](https://storybook.js.org/docs)
