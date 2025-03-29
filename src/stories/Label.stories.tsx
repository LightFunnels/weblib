import type { Meta, StoryObj } from '@storybook/react';
import { Button, Label } from '../components';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

export const WithAction: Story = {
  args: {
    children: 'Label with Action',
  },
};

export const LongLabel: Story = {
  args: {
    children: 'This is a very long label that might wrap to multiple lines',
  },
};

