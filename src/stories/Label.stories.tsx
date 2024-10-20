import type { Meta, StoryObj } from '@storybook/react';
import { Button, Label } from '../components';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    action: { control: 'boolean' },
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
    action: <Button size="small">Action</Button>,
  },
};

export const LongLabel: Story = {
  args: {
    children: 'This is a very long label that might wrap to multiple lines',
    helpIcon: 'Additional information about this long label',
  },
};

