import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/modal';
import { Button } from '../components/button';

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

const createModalStory = (title: string, content: React.ReactNode) => {
  return () => {
    const [isOpen, openModal, closeModal] = Modal.useModalState();

    return (
      <>
        <Button onClick={openModal}>Open {title}</Button>
        <Modal active={isOpen} close={closeModal}>
          <div>
            <Modal.Title onClick={closeModal}>{title}</Modal.Title>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
              <Button onClick={closeModal} variant="secondary">Cancel</Button>
              <Button onClick={closeModal}>Confirm</Button>
            </Modal.Footer>
          </div>
        </Modal>
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
    const [isOpen, openModal, closeModal] = Modal.useModalState();

    return (
      <>
        <Button onClick={openModal}>Open Modal Without Footer</Button>
        <Modal active={isOpen} close={closeModal}>
          <div>
            <Modal.Title onClick={closeModal}>Modal Without Footer</Modal.Title>
            <Modal.Body>
              <p>This modal doesn't have a footer section.</p>
            </Modal.Body>
          </div>
        </Modal>
      </>
    );
  }
};

