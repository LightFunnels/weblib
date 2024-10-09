import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../components/spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    variant:'primary'
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
  },
};

