import { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../components';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: { 
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    className: { control: 'text' },
    inputClassName: { control: 'text' },
    inputContainerClassName: { control: 'text' },
    hint: { control: 'text' },
  },
} as const;

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    
  },
};
