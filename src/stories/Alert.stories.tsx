import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Button, Close } from '../components';

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
      options: ['error', 'warning', 'success'],
    },
    message: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    thumbnail: {
      control: 'text',
    },
    action: {
      control: 'object',
    },
    bottomActions: {
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    message: 'This is an alert message',
    thumbnail: <PlaceholderIcon />
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    label: 'Error',
    message: 'An error has occurred',
    thumbnail: <PlaceholderIcon />
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: 'Warning',
    message: 'This action may have consequences',
    thumbnail:<PlaceholderIcon />
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Success',
    message: 'Operation completed successfully',
    thumbnail:<PlaceholderIcon />

  },
};

export const WithActions: Story = {
  args: {
    label: 'With Actions',
    message: 'This alert has action buttons',
    thumbnail:<PlaceholderIcon />,
    action: (
      <Close className="alertCloseIcon" />
    ),
  },
};

export const WithBodyActions: Story = {
  args: {
    label: 'With body Actions',
    message: 'This alert has body action buttons',
    thumbnail:<PlaceholderIcon />,
    bottomActions: (
      <>
        <Button>Confirm</Button>
        <Button variant='secondary'>Cancel</Button>
      </>
    ),
  },
};
