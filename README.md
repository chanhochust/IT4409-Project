# Introduction

This is a NextJS project that utilizes Jotai as a state management library. It allows you to create a project structure
based on features, which can separate your logic and UI. Doing so reduces the project's complexity and makes it more
maintainable, as you can modify UI and logic separately without affecting each other. This pattern is inspired by the
Angular framework, allowing you to create each feature as a module that encapsulates the logic and UI while benefiting
from React and NextJS.

## Core libraries

- [NextJS](https://nextjs.org/): A React framework that enables functionality such as server-side rendering and generating static websites for React-based web applications.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
- [Jotai](https://jotai.org/): A simple and fast state management library for React.

## UI
For UI library components, consider using headless UI components,
such as [Radix](https://radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/) since we are using Tailwind CSS.