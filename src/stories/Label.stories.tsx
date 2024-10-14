import type { Meta, StoryObj } from '@storybook/react';
import { Button, Label } from '../components';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    helpIcon: { control: 'text' },
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

export const WithHelpIcon: Story = {
  args: {
    children: 'Label with Help Icon',
    helpIcon: 'This is a helpful tooltip',
  },
};

export const WithAction: Story = {
  args: {
    children: 'Label with Action',
    action: <Button size="small">Action</Button>,
  },
};

export const WithHelpIconAndAction: Story = {
  args: {
    children: 'Label with Help Icon and Action',
    helpIcon: 'This is a helpful tooltip',
    action: <Button size="small">Action</Button>,
  },
};

export const LongLabel: Story = {
  args: {
    children: 'This is a very long label that might wrap to multiple lines',
    helpIcon: 'Additional information about this long label',
  },
};

