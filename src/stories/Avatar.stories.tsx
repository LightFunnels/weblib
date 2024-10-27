import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../components';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: [
      	"l2",
      	"l",
      	"regular",
      	"s",
      	"s2",
      ],
    },
    borderRadius: {
      control: 'radio',
      options: ['regular', 'full'],
    },
    src: {
      control: 'text',
    },
    fallback: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'regular',
    borderRadius: 'regular',
  },
};

export const WithImage: Story = {
  args: {
    ...Default.args,
    borderRadius: 'full',
    src: 'https://www.gravatar.com/avatar/80f1a2a8129391042704c5276a49fe46',
  },
};

export const WithFallback: Story = {
  args: {
    ...Default.args,
    fallback: 'JD',
  },
};

export const FullyRounded: Story = {
  args: {
    ...Default.args,
    borderRadius: 'full',
  },
};

export const WithChildren: Story = {
  args: {
    ...Default.args,
    children: 'AB',
  },
}
