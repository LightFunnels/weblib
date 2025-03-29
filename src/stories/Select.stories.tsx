import { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
    cancellable: {
      control: 'boolean',
    },
    isSearchable: {
      control: 'boolean',
    }
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
  	disabled: false,
  	cancellable: true,
  	isSearchable: true,
    options: [
	    {
	    	label: "Morocco",
	    	value: "ma"
	    },
	    {
	    	label: "Algeria",
	    	value: "dz"
	    }
    ],
    value: "ma",
    onChange: () => {}
  },
};


