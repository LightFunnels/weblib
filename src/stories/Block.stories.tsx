import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Block } from '../components/block';
import { Button } from '../components/button';

const meta: Meta<typeof Block> = {
  title: 'Components/Block',
  component: Block,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subTitle: { control: 'text' },
    breadcrumbs: { control: 'object' },
    actions: { control: 'object' },
    breadcrumbsActions: { control: 'object' },
    noMargin: { control: 'boolean' },
    medium: { control: 'boolean' },
    className: { control: 'text' },
    titleWrapperClassName: { control: 'text' },
    headingClassName: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Block>;

export const Default: Story = {
  args: {
    title: 'Default Block Title',
    children: <p>This is the default block content.</p>,
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    ...Default.args,
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'Section', to: '/section' },
      { label: 'Current Page' },
    ],
  },
};

export const WithActions: Story = {
  args: {
    ...Default.args,
    actions: <Button>Action Button</Button>,
  },
};

export const WithSubtitle: Story = {
  args: {
    ...Default.args,
    subTitle: 'This is a subtitle for the block',
  },
};

export const MediumTitle: Story = {
  args: {
    ...Default.args,
    medium: true,
  },
};

export const NoMargin: Story = {
  args: {
    ...Default.args,
    noMargin: true,
  },
};

export const WithBreadcrumbActions: Story = {
  args: {
    ...WithBreadcrumbs.args,
    breadcrumbsActions: <Button size="small">Breadcrumb Action</Button>,
  },
};

export const ComplexContent: Story = {
  args: {
    ...WithBreadcrumbs.args,
    title: 'Complex Block Example',
    subTitle: 'This block has various content types',
    actions: <Button>Main Action</Button>,
    children: (
      <div>
        <p>This is a paragraph within the block content.</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </ul>
        <Button>Content Action</Button>
      </div>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: 'This is a very long title that should wrap to multiple lines and demonstrate how the component handles overflow',
  },
};

export const RTLSupport: Story = {
  args: {
    ...WithBreadcrumbs.args,
    title: 'RTL Support Example',
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div dir="rtl" style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomClassNames: Story = {
  args: {
    ...Default.args,
    className: 'custom-block-class',
    titleWrapperClassName: 'custom-title-wrapper-class',
    headingClassName: 'custom-heading-class',
  },
};
