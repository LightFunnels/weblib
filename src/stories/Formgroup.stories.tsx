import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup } from '../components';

const PlaceholderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="22" height="22" {...props}>
    <circle cx="20" cy="20" r="18" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2"/>
    <path d="M12 20h16M20 12v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const meta: Meta<typeof FormGroup> = {
  title: 'Components/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
  argTypes: {
    action: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  args: {
    action: 'This is an action',
    label: 'This is a label',
  },
};
