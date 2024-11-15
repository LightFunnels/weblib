import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/button';
import { Modal } from '../components/modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    close: { action: 'closed' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

function useModalState(){
	const [s, ss] = React.useState(false);
	return [s, () => ss(true), () => ss(false)] as const;
}

const createModalStory = (title: string, content: React.ReactNode) => {
  return () => {
    const [isOpen, openModal, closeModal] = useModalState();
    return (
      <>
        <Button onClick={openModal}>Open {title}</Button>
        {
        	isOpen &&
	        <Modal
	        	header={title}
	        	body={content}
	        	close={closeModal}>
	        </Modal>
        }
      </>
    );
  };
};

export const Default: Story = {
  render: createModalStory(
    "Default Modal",
    <p>This is the default modal content.</p>
  )
};

export const WithLongContent: Story = {
  render: createModalStory(
    "Long Content Modal",
    <>
      <p>This modal has a lot of content to demonstrate scrolling behavior.</p>
      {Array(20).fill(null).map((_, index) => (
        <p key={index}>This is paragraph {index + 1} of the long content.</p>
      ))}
    </>
  )
};

export const WithoutFooter: Story = {
  render: () => {
    const [isOpen, openModal, closeModal] = useModalState();

    return (
      <>
        <Button onClick={openModal}>Open Modal Without Footer</Button>
        {
        	isOpen && (
		        <Modal
		        	header="Modal Without Footer"
		        	body={<p>This modal doesn't have a footer section.</p>}
		        	close={closeModal}>
		        </Modal>
        	)
        }
      </>
    );
  }
};

