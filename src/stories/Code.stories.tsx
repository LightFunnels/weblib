import type { Meta, StoryObj } from '@storybook/react';
import { Code } from '../components';

const meta: Meta<typeof Code> = {
  title: 'Components/Code',
  component: Code,
  tags: ['autodocs'],
  argTypes: {
    copiable: {
      control: 'boolean',
    },
    value: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Default: Story = {
  args: {
    value: 'Hello World',
    copiable: true
  },
};