# Introduction

This is a NextJS project that utilizes Jotai as a state management library. It allows you to create a project structure
based on features, which can separate your logic and UI. Doing so reduces the project's complexity and makes it more
maintainable, as you can modify UI and logic separately without affecting each other. This pattern is inspired by the
Angular framework, allowing you to create each feature as a module that encapsulates the logic and UI while benefiting
from React and NextJS.

## Core libraries

- [NextJS](https://nextjs.org/): A React framework that enables functionality such as server-side rendering and generating static websites for React-based web applications.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
- [Valtio](https://valtio.dev/docs/introduction/getting-started): A simple and fast state management library for React.

## UI
For UI library components, consider using headless UI components,
such as [Radix](https://radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/) since we are using Tailwind CSS.


## Read the docs

Make sure to read the docs first to understand the project structure and concepts.

- [Valtio State Management](./docs/Valtio.md)
- [Storybook UI Library](./docs/Storybook.md)

## Testing

This project uses [Vitest](https://vitest.dev/) for unit and integration testing. The tests are written using the [Testing Library](https://testing-library.com/) for React components.

### Running Tests

To run the tests, use the following commands:

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with coverage report
pnpm test:coverage
```

### Coverage Reports

After running `pnpm test:coverage`, a coverage report will be generated in the `coverage` directory. You can view the HTML report by opening `coverage/index.html` in your browser.

The coverage configuration is set up in `vitest.config.mts` and includes:

- Statement coverage threshold: 0% (disabled)
- Branch coverage threshold: 0% (disabled)
- Function coverage threshold: 0% (disabled)
- Line coverage threshold: 0% (disabled)

These thresholds are currently set to 0% to allow for gradual improvement of test coverage. As the project matures, these thresholds should be increased to ensure the codebase maintains a high level of test coverage (recommended: 80% or higher).
