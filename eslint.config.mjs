// @ts-check
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import perfectionist from 'eslint-plugin-perfectionist';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook'
import tailwind from "eslint-plugin-tailwindcss";
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...storybook.configs['flat/recommended'],
  ...tailwind.configs['flat/recommended'],
  reactPlugin.configs.flat?.recommended,
    ...tailwind.configs['flat/recommended'],

  {
    files: ['src/**/*.{tsx,ts}'],
  },
  {
    rules: {
      'tailwindcss/classnames-order': 'off',
    },
  },
  
    {
    ...perfectionist.configs['recommended-natural'],
    rules: {
      'perfectionist/sort-classes': 'off',
      'perfectionist/sort-enums': 'off',
    },
  },
 {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
    },
    settings: {
      react: {
        version: 'detect', // You can add this if you get a warning about the React version when you lint
      },
    },
  },
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: reactHooksPlugin.configs.recommended.rules,
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
  
    languageOptions: {
      ...reactPlugin.configs.flat?.recommended.languageOptions,
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'error',
      'react/prefer-read-only-props': 'warn',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'prefer-template': 'error',
      'no-console': [
        'warn',
        {
          allow: ['error', 'warn', 'info'],
        },
      ],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'ignore',
        },
      ],
      eqeqeq: 'error',
      'no-restricted-imports': [
        'warn',
        {
          patterns: ['../../*'],
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
  {
    ignores: ['.next'],
  }
];
