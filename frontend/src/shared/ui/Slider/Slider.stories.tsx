import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '.';

const meta = {
  title: 'UI/Components/Slider',
  component: Slider,
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
    standard: {
      description:
        '`0`에서 `max` 사이의 숫자를 의미합니다.\n현재 완료된 양을 나타냅니다.',
    },
    max: {
      description: '최대 `value`를 지정합니다.',
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof Slider>;

export const Primary: Story = {
  args: {
    max:100,
    standard:50,
  },
};