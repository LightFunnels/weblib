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
      options: ['large', 'medium', 'small'],
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

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'This is medium text',
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
    size: 'medium',
    children: 'This is a longer piece of text to demonstrate how the component handles multiple lines. It should wrap properly and maintain the correct line height and spacing.',
  },
};


