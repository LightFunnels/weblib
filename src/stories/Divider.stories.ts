import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Divider } from '../components'

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    children: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Divider>

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
}

export const WithText: Story = {
  args: {
    orientation: 'horizontal',
    children: 'Divider Text',
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
}



