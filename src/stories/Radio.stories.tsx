import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../components/radio';

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'Components/Radio',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    checked: false,
    label: 'Default Radio',
    name: 'default',
    value: 'default',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Checked Radio',
    name: 'checked',
    value: 'checked',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    label: 'Disabled Radio',
    disabled: true,
    name: 'disabled',
    value: 'disabled',
  },
};

export const CheckedAndDisabled: Story = {
  args: {
    checked: true,
    label: 'Checked and Disabled Radio',
    disabled: true,
    name: 'checkedDisabled',
    value: 'checkedDisabled',
  },
};

export const WithLongLabel: Story = {
  args: {
    checked: false,
    label: 'This is a radio button with a very long label that might wrap to multiple lines',
    name: 'longLabel',
    value: 'longLabel',
  },
};

export const WithJSXLabel: Story = {
  args: {
    checked: false,
    label: (
      <span>
        Radio with <strong>formatted</strong> <em>label</em>
      </span>
    ),
    name: 'jsxLabel',
    value: 'jsxLabel',
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('option1');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(event.target.value);
    };

    return (
      <div className="space-y-2">
        <Radio
          name="radioGroup"
          value="option1"
          checked={selected === 'option1'}
          onChange={handleChange}
          label="Option 1"
        />
        <Radio
          name="radioGroup"
          value="option2"
          checked={selected === 'option2'}
          onChange={handleChange}
          label="Option 2"
        />
        <Radio
          name="radioGroup"
          value="option3"
          checked={selected === 'option3'}
          onChange={handleChange}
          label="Option 3"
        />
      </div>
    );
  },
};
