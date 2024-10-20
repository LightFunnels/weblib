import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '../components/toggle';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'Components/Toggle',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
    size: {
      control: 'radio',
      options: ['default', 'small'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'Default Toggle',
    size: 'default',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked Toggle',
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    checked: false,
    label: 'Small Toggle',
    size: 'small',
  },
};

export const SmallChecked: Story = {
  args: {
    checked: true,
    label: 'Small Checked Toggle',
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    label: 'Disabled Toggle',
    disabled: true,
    size: 'default',
  },
};

export const CheckedAndDisabled: Story = {
  args: {
    checked: true,
    label: 'Checked and Disabled Toggle',
    disabled: true,
    size: 'default',
  },
};

