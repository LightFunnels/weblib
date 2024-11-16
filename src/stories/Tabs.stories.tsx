import { Meta, StoryObj } from '@storybook/react'
import { TabHeaderItem, TabsHeader } from '../components'

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const meta: Meta<typeof TabsHeader> = {
  title: 'Components/Tabs',
  component: TabsHeader,
  tags: ['autodocs'],
  argTypes: {
  },
}

export default meta

type Story = StoryObj<typeof TabsHeader>

export const Primary: Story = {
  args: {},
  render: (args) => (
    <TabsHeader>
      <TabHeaderItem active={true}>
        <div>
        	<HomeIcon />
        	<span>Home</span>
        </div>
      </TabHeaderItem>
      <TabHeaderItem>
        <div>
        	<HomeIcon />
        	<span>Home</span>
        </div>
      </TabHeaderItem>
    </TabsHeader>
  ),
}
