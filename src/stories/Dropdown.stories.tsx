import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/button';
import { Dropdown, DropdownItem, DropdownMenu } from '../components';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'],
    },
    keep_on_click_in: { control: 'boolean' },
    offset: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const DefaultMenu = React.forwardRef<HTMLDivElement>((props, ref) => (
  <>
    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
    <DropdownItem>Option 3</DropdownItem>
  </>
));

export const Default: Story = {
  args: {
    label: <Button>Open Dropdown</Button>,
    children: 
    <>
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
      <DropdownItem>Option 3</DropdownItem>
    </>
  },
};

export const CustomPlacement: Story = {
  args: {
    label: <Button>Custom Placement</Button>,
    children: <DefaultMenu />,
    placement: 'right-start',
  },
};

export const WithOffset: Story = {
  args: {
    label: <Button>With Offset</Button>,
    children: <DefaultMenu />,
    offset: [0, 16],
  },
};

export const KeepOpenOnClickIn: Story = {
  args: {
    label: <Button>Keep Open on Click</Button>,
    children: <DefaultMenu />,
    keep_on_click_in: true,
  },
};

export const CustomMenu: Story = {
  args: {
    label: <Button>Custom Menu</Button>,
    menu: (
      <DropdownMenu>
        <DropdownItem>
          <span className="lfui-dropdownIcon">🍎</span>
          Apple
        </DropdownItem>
        <DropdownItem>
          <span className="lfui-dropdownIcon">🍌</span>
          Banana
        </DropdownItem>
        <DropdownItem>
          <span className="lfui-dropdownIcon">🍇</span>
          Grape
        </DropdownItem>
      </DropdownMenu>
    ),
  },
};

export const WithActiveItem: Story = {
  args: {
    label: <Button>With Active Item</Button>,
    menu: (
      <DropdownMenu>
        <DropdownItem>Normal Item</DropdownItem>
        <DropdownItem active>Active Item</DropdownItem>
        <DropdownItem>Normal Item</DropdownItem>
      </DropdownMenu>
    ),
  },
};

