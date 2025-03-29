import { Meta, StoryObj } from '@storybook/react';
import React, {Fragment} from 'react';
import { Button, Modal, Text } from '../components';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
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

const createModalStory = (title: string, content: string|React.ReactElement) => {
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
    <Text>This is the default modal content.</Text>
  )
};

export const WithLongContent: Story = {
  render: createModalStory(
    "Long Content Modal",
    <>
      <Text>This modal has a lot of content to demonstrate scrolling behavior.</Text>
      {Array(20).fill(null).map((_, index) => (
        <Text key={index}>This is paragraph {index + 1} of the long content.</Text>
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
		        	body={"This modal doesn't have a footer section."}
		        	footer={
		        		<Fragment>
		        			<Button children="Cancel" variant="secondary" />
		        			<Button children="Save" />
		        		</Fragment>
		        	}
		        	close={closeModal}>
		        </Modal>
        	)
        }
      </>
    );
  }
};

