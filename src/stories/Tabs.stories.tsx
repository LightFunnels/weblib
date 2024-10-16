import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
)

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

export const Primary: Story = {
  args: {
    variant: 'primary',
    defaultValue: 'home',
  },
  render: (args) => (
    <Tabs {...args} >
      <TabsList>
        <TabsTrigger value="home">
          <HomeIcon />
          <span>Home</span>
        </TabsTrigger>
        <TabsTrigger value="settings">
          <SettingsIcon />
          <span>Settings</span>
        </TabsTrigger>
        <TabsTrigger value="messages">
          <MessageIcon />
          <span>Messages</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <h2>Welcome Home</h2>
        <p>This is the home tab content. You can add any information or components here.</p>
      </TabsContent>
      <TabsContent value="settings">
        <h2>Settings</h2>
        <p>Adjust your preferences and account settings here.</p>
      </TabsContent>
      <TabsContent value="messages">
        <h2>Messages</h2>
        <p>View and manage your messages in this tab.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    defaultValue: 'home',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList >
        <TabsTrigger value="home">
          <HomeIcon />
          <span>Home</span>
        </TabsTrigger>
        <TabsTrigger value="settings">
          <SettingsIcon />
          <span>Settings</span>
        </TabsTrigger>
        <TabsTrigger value="messages">
          <MessageIcon />
          <span>Messages</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <h2>Welcome Home</h2>
        <p>This is the home tab content for the secondary variant.</p>
      </TabsContent>
      <TabsContent value="settings">
        <h2>Settings</h2>
        <p>Adjust your preferences and account settings here (secondary variant).</p>
      </TabsContent>
      <TabsContent value="messages">
        <h2>Messages</h2>
        <p>View and manage your messages in this tab (secondary variant).</p>
      </TabsContent>
    </Tabs>
  ),
}
