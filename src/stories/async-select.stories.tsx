import { Meta, StoryObj } from '@storybook/react';
import { AsyncSelect } from '../components';
import lodash from "lodash";

const meta: Meta<typeof AsyncSelect> = {
  title: 'Components/AsyncSelect',
  component: AsyncSelect,
  tags: ['autodocs'],
  argTypes: {
    // value: {
    //   control: 'select',
    // },
    // disabled: {
    //   control: 'boolean',
    // },
    // cancellable: {
    //   control: 'boolean',
    // },
    // isSearchable: {
    //   control: 'boolean',
    // }
  },
};

export default meta;

type Story = StoryObj<typeof AsyncSelect>;

async function load(args, ab){
	// ab.signal.addEventListener("abort", () => { })
	await new Promise((res) => {
		setTimeout(res, 100);
	});
	let ndx = _edges.findIndex(e => e.cursor === args.cursor);
	const edges = _edges.slice(ndx+1, ndx+2);
	return {
		edges,
		pageInfo:{
			hasNextPage: (ndx+1) < (_edges.length-1),
			endCursor: lodash.last(edges)?.cursor
		}
	}
}

function render(props){
	return (
		<div style={{height: 500}}>
			<AsyncSelect
		    {...props}
		    load={load}
			/>
		</div>
	)
}

export const Default: Story = {
	args: {
	  value: ["1"],
	  onChange: console.log
	},
	render
};

export const Multi: Story = {
	args: {
	  value: ["1", "2"],
	  limit: 2,
	  onChange: console.log
	},
	render
};

const _edges = [
	{
		node:{
			value: "1",
			label: "1"
		},
		cursor: "1"
	},
	// {
	// 	node:{
	// 		value: "2",
	// 		label: "2"
	// 	},
	// 	cursor: "2"
	// },
	// {
	// 	node:{
	// 		value: "3",
	// 		label: "3"
	// 	},
	// 	cursor: "3"
	// },
	// {
	// 	node:{
	// 		value: "4",
	// 		label: "4"
	// 	},
	// 	cursor: "4"
	// },
	// {
	// 	node:{
	// 		value: "5",
	// 		label: "5"
	// 	},
	// 	cursor: "5"
	// },
	// {
	// 	node:{
	// 		value: "6",
	// 		label: "6"
	// 	},
	// 	cursor: "6"
	// },
];