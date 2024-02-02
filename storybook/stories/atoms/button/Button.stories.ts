import { BuildButton } from './Button';

export default {
  title: '/Atoms/Button',
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'quatenary'],
      description: 'The color for the button, by default it is primary',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size for the button, by default it is md - medium',
    },
    label: {
      control: { type: 'text' },
      defaultValue: 'button',
      description:
        'Input different content to see the button with different text',
    },
    ghost: {
      control: { type: 'boolean' },
      description: 'See the ghost status of the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'see if you want to disabled the button',
    },
  },
};

export const Button = (args) => {
  return BuildButton({ ...args });
};
Button.args = {
  color: 'primary',
  size: 'md',
  label: 'button',
  ghost: false,
  disabled: false,
};
