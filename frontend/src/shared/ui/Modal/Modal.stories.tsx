/** @jsxImportSource @emotion/react */
import React from 'react';
import type { Meta } from '@storybook/react';
import { Modal } from '.';
;

const meta = {
  title: 'UI/Components/Modal',
  component: Modal,
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
      description: '모달 안에 들어갈 컴포넌트입니다.'
    },
    xHandler: {
      description: 'X 아이콘에 대한 핸들러 함수입니다.'
    }
  },
} satisfies Meta<typeof Modal>;

export default meta;

