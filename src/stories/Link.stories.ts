import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../components';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'secondary', 'primary'],
    },
    size: {
      control: 'radio',
      options: ['default', 'small'],
    },
    button: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
    to: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '#',
  },
};

export const AsButton: Story = {
  args: {
    children: 'Button Link',
    button: true,
    href: '#',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button Link',
    button: true,
    variant: 'primary',
    href: '#',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button Link',
    button: true,
    variant: 'secondary',
    href: '#',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button Link',
    button: true,
    variant: 'destructive',
    href: '#',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button Link',
    button: true,
    size: 'small',
    href: '#',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button Link',
    button: true,
    loading: true,
    href: '#',
  },
};


