import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Badge, Option } from '../components/badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'warning', 'success', 'neutral', 'caution'],
    },
    size: {
      control: 'radio',
      options: ['default', 'large'],
    },
    label: { control: 'text' },
    hideDropdown: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    dir: {
      control: 'radio',
      options: ['ltr', 'rtl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

const options: Option[] = [
  { name: 'Option 1', value: 'option1', variant: 'primary', label: 'Option 1' },
  { name: 'Option 2', value: 'option2', variant: 'warning', label: 'Option 2' },
  { name: 'Option 3', value: 'option3', variant: 'success', label: 'Option 3' },
  { name: 'Option 4', value: 'option4', variant: 'neutral', label: 'Option 4' },
  { name: 'Option 5', value: 'option5', variant: 'caution', label: 'Option 5' },
];

export const Default: Story = {
  args: {
    label: 'Default Badge',
  },
};

export const WithDropdown: Story = {
  args: {
    ...Default.args,
    options: options,
    value: options[0],
    hideDropdown: false,
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    showIcon: true,
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

export const RTL: Story = {
  args: {
    ...Default.args,
    showIcon:true,
    dir: 'rtl',
    options: options,
    value: options[0],
    hideDropdown: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {['primary', 'warning', 'success', 'neutral', 'caution'].map((variant) => (
        <Badge
          key={variant}
          label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Badge`}
          variant={variant as 'primary' | 'warning' | 'success' | 'neutral' | 'caution'}
          showIcon
          options={options}
          value={options.find(option => option.variant === variant) || options[0]}
        />
      ))}
    </div>
  ),
};

export const InteractiveBadge: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = React.useState(options[0]);

    const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
      const value = e.currentTarget.getAttribute('data-type');
      const newOption = options.find(op => op.value === value);
      if (newOption) {
        setSelectedOption(newOption);
      }
    };

    return (
      <Badge
        label={selectedOption.name}
        value={selectedOption}
        options={options}
        onChange={handleChange}
        hideDropdown={false}
        showIcon
      />
    );
  },
};
