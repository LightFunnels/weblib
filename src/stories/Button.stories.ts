import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['default', 'small'],
    },
    loading: {
      control: 'boolean',
    },
    leftIcon: {
      control: 'text',
    },
    rightIcon: {
      control: 'text',
    },
    IconClassName: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: 'icon-class',
    children: 'Button with Left Icon',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: 'icon-class',
    children: 'Button with Right Icon',
  },
};
