import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from '.';

const meta = {
  title: 'UI/Components/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['!autodocs'],
  argTypes: {
    children: {
      description: 'text를 입력해주세요',
    },
    type: {
      description: 'TopBar의 타입입니다.',
    },
  },
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<typeof TopBar>;

export const Primary: Story = {
  args: {},
  render: () => (
    <div style={{ width: '360px' }}>
      <TopBar></TopBar>
    </div>
  ),
};

export const WithoutBack: Story = {
  args: {},
  render: () => (
    <div style={{ width: '360px' }}>
      <TopBar>
        <TopBar.Title type="withoutBack" />
        <TopBar.Right handler={() => console.log('right icon click')} />
      </TopBar>
    </div>
  ),
};

export const WithoutRight: Story = {
  args: {},
  render: () => (
    <div style={{ width: '360px' }}>
      <TopBar>
        <TopBar.Title type="default" />
      </TopBar>
    </div>
  ),
};

export const Search: Story = {
  args: {},
  render: () => (
    <div style={{ width: '360px' }}>
      <TopBar>
        <TopBar.Title type="search" />
        <TopBar.Right
          icon={<MagnifyingGlassIcon />}
          handler={() => console.log('right icon click')}
        />
      </TopBar>
    </div>
  ),
};
