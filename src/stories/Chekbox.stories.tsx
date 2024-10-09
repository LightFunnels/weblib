import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'Default Checkbox',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked Checkbox',
  },
};
export const Disabled: Story = {
  args: {
    checked: false,
    label: 'Disabled Checkbox',
    disabled: true,
  },
};
export const CheckedAndDisabled: Story = {
  args: {
    checked: true,
    label: 'Checked and Disabled Checkbox',
    disabled: true,
  },
};
export const WithLongLabel: Story = {
  args: {
    checked: false,
    label: 'This is a checkbox with a very long label that might wrap to multiple lines',
  },
};

export const WithJSXLabel: Story = {
  args: {
    checked: false,
    label: (
      <span>
        Checkbox with <strong>formatted</strong> <em>label</em>
      </span>
    ),
  },
};
