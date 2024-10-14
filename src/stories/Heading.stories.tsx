import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Heading } from '../components';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    version: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    children: { control: 'text' },
    className: { control: 'text' },
  },
} as const;

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'Default Heading',
  },
};

export const H1: Story = {
  args: {
    version: 'h1',
    children: 'Heading 1',
  },
};

export const H2: Story = {
  args: {
    version: 'h2',
    children: 'Heading 2',
  },
};

export const H3: Story = {
  args: {
    version: 'h3',
    children: 'Heading 3',
  },
};

export const H4: Story = {
  args: {
    version: 'h4',
    children: 'Heading 4',
  },
};

export const H5: Story = {
  args: {
    version: 'h5',
    children: 'Heading 5',
  },
};

export const H6: Story = {
  args: {
    version: 'h6',
    children: 'Heading 6',
  },
};


export const AllHeadings: Story = {
  render: () => (
    <div>
      <Heading version="h1">Heading 1</Heading>
      <Heading version="h2">Heading 2</Heading>
      <Heading version="h3">Heading 3</Heading>
      <Heading version="h4">Heading 4</Heading>
      <Heading version="h5">Heading 5</Heading>
      <Heading version="h6">Heading 6</Heading>
    </div>
  ),
};
