import type { Meta, StoryObj } from '@storybook/react';
import { PopoverCard, usePopover } from '../components';

function PopoverDemo(){
	const [ref, menuRef, show, ,, arrow] = usePopover<HTMLElement, HTMLDivElement>({
		state: true,
		placement: "top-start",
		nonTogglable: true
	});
	return (
		<div style={{height: 500}}>
			<div style={{height: 300}}></div>
			<span ref={ref}>Hover Here</span>
			{
				show &&
				<PopoverCard ref={menuRef} style={{width: 300}}>
					Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
					{arrow}
				</PopoverCard>
			}
			<div style={{height: 800}}></div>
		</div>
	)
}

const meta: Meta<typeof PopoverCard> = {
  title: 'Components/PopoverCard',
  component: PopoverDemo,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof PopoverCard>;

export const Default: Story = {
  args: {},
};