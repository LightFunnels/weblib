import type { Meta, StoryObj } from '@storybook/react';
import { NativeLink } from '../components';

const meta: Meta<typeof NativeLink> = {
  title: 'Components/NativeLink',
  component: NativeLink,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
    href: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NativeLink>;

export const Default: Story = {
  args: {
    children: 'Default NativeLink',
    href: '#',
  },
};

