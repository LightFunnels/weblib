import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../components/spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'regular', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
  },
};

export const Regular: Story = {
  args: {
    size: 'regular',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

