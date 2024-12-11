import React from 'react';

import './button.css';

export interface ButtonProps {
  /** What background color to use */
  readonly backgroundColor?: string;
  /** Button contents */
  readonly label: string;
  /** Optional click handler */
  readonly onClick?: () => void;
  /** Is this the principal call to action on the page? */
  readonly primary?: boolean;
  /** How large should the button be? */
  readonly size?: 'large' | 'medium' | 'small';
}

/** Primary UI component for user interaction */
export const Button = ({ backgroundColor, label, primary = false, size = 'medium', ...props }: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      className={['storybook-button', `storybook-button--${size}`, mode, 'bg-red-500'].join(' ')}
      type='button'
      {...props}>
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
