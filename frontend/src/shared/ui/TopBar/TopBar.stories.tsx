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
  args: { children: '테스트', type: 'page' },
};
