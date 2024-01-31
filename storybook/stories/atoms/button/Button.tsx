import React from 'react';
import './button.scss';

interface ButtonProps {
  color?: 'primary' | 'secondary' | 'tertiary' | 'quatenary'
  backgroundColor?: string;
  size?: 'sm' | 'md' | 'lg';
  label: string;
  ghost? : boolean;
  disabled? : boolean;
}

/**
 * Primary UI component for user interaction
 */
export const BuildButton = ({
  color = 'primary',
  size = 'md',
  label,
  ghost = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={[`button-${size}`, `${disabled ? ' button-disabled':`button-${color}${ghost?' button-ghost':''}`}`].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};
