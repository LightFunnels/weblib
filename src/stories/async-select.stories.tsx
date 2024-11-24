import { Meta, StoryObj } from '@storybook/react';
import lodash from "lodash";
import { AsyncSelect } from '../components';

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

async function load(args: {after: string, first: number, query: string}, ab){
	// ab.signal.addEventListener("abort", () => { })
	await new Promise((res) => {
		setTimeout(res, 100);
	});
	let ndx = _edges.findIndex(e => e.cursor === args.after);
	const edges = _edges.slice(ndx+1, ndx+100);
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

const _edges = lodash.times(30).map(item => {
	return {
		node:{
			value: item.toString(),
			label: item.toString()
		},
		cursor: item.toString()
	}
});