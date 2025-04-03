import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    include: [
      '**/*.test.ts',
      '**/*.test.tsx',
      'src/**/*.test.ts',
      'src/**/*.test.tsx'
    ],
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
}); 