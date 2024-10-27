import { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'warning', 'success', 'neutral', 'destructive'],
    },
    borderRadius: {
      control: 'radio',
      options: ['max', 'full', "regular"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
    variant: "primary"
  },
};

