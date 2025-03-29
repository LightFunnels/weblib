import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../components';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'regular', 'small'],
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
type Story = StoryObj<typeof Text>;

export const Large: Story = {
  args: {
    size: 'large',
    children: 'This is large text',
  },
};

export const Regular: Story = {
  args: {
    size: 'regular',
    children: 'This is regular text',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'This is small text',
  },
};


export const LongText: Story = {
  args: {
    size: 'regular',
    children: 'This is a longer piece of text to demonstrate how the component handles multiple lines. It should wrap properly and maintain the correct line height and spacing.',
  },
};


