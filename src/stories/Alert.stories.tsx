import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Button } from '../components';

const PlaceholderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="22" height="22" {...props}>
    <circle cx="20" cy="20" r="18" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2"/>
    <path d="M12 20h16M20 12v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
    },
    message: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    icon: {
      control: 'text',
    },
    actions: {
      control: 'object',
    },
    bottomActions: {
      control: 'object',
    },
    setClose: {
      action: 'closed',
    },
    noClose: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    message: 'This is an alert message',
    icon: <PlaceholderIcon />
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    label: 'Error',
    message: 'An error has occurred',
    icon: <PlaceholderIcon />
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: 'Warning',
    message: 'This action may have consequences',
    icon:<PlaceholderIcon />
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    label: 'Information',
    message: 'Here is some important information',
    icon:<PlaceholderIcon />
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Success',
    message: 'Operation completed successfully',
    icon:<PlaceholderIcon />

  },
};

export const WithActions: Story = {
  args: {
    label: 'With Actions',
    message: 'This alert has action buttons',
    icon:<PlaceholderIcon />,
    actions: (
      <>
        <Button>Confirm</Button>
        <Button variant='secondary'>Cancel</Button>
      </>
    ),
  },
};

export const WithBottomActions: Story = {
  args: {
    label: 'With Bottom Actions',
    message: 'This alert has bottom action buttons',
    icon:<PlaceholderIcon />,
    bottomActions: (
      <>
        <Button>Learn More</Button>
      </>
    ),
  },
};
