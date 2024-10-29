// BottomSheetDropdown.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheetDropdown } from './BottomSheetDropdown';

const meta = {
  title: 'Components/BottomSheetDropdown',
  component: BottomSheetDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '바텀시트 스타일의 드롭다운 컴포넌트입니다.'
      }
    }
  },
  argTypes: {
    options: {
      description: '드롭다운에 표시될 옵션 배열',
      defaultValue: ['김싸피', '박싸피', '이싸피']
    },
    selectedValue: {
      description: '현재 선택된 값',
      control: 'text'
    },
    isOpen: {
      description: '드롭다운의 열림/닫힘 상태',
      control: 'boolean'
    },
    onSelect: {
      description: '옵션 선택 시 호출되는 콜백 함수',
      action: 'selected'
    },
    onClose: {
      description: '드롭다운이 닫힐 때 호출되는 콜백 함수',
      action: 'closed'
    }
  }
} satisfies Meta<typeof BottomSheetDropdown>;

export default meta;
