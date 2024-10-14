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
    disabled:{
      control: 'boolean',
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

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
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
const IconSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
export const WithLeftIcon: Story = {
  args: {
    children: (
      <>
        <IconSVG />
        <span className="flex-grow text-center">Button with Left Icon</span>
      </>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    children: (
      <>
        <span className="flex-grow text-center">Button with Right Icon</span>
        <IconSVG />
      </>
    ),
  },
};
