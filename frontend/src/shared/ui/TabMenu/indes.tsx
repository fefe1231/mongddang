/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TabMenuProps } from './TabMenu.types';
import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { contentCss, labelCss } from './styles';

const data = [
  {
    id: 'food',
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon size={1.5}>
          <img alt="icon-food" src="/img/%EB%A7%90%EB%9E%911.png" />
        </Icon>
        <Typography color="dark" size="1" weight={700}>
          밥
        </Typography>
      </div>
    ),
  },
  {
    id: 'exercise',
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon size={1.5}>
          <img alt="icon-exercise" src="/img/%EB%A7%90%EB%9E%911.png" />
        </Icon>
        <Typography color="dark" size="1" weight={700}>
          운동
        </Typography>
      </div>
    ),
  },
  {
    id: 'sleep',
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon size={1.5}>
          <img alt="icon-sleep" src="/img/%EB%A7%90%EB%9E%911.png" />
        </Icon>
        <Typography color="dark" size="1" weight={700}>
          수면
        </Typography>
      </div>
    ),
  },
  {
    id: 'medicine',
    label: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Icon size={1.5}>
          <img alt="icon-medicine" src="/img/%EB%A7%90%EB%9E%911.png" />
        </Icon>
        <Typography color="dark" size="1" weight={700}>
          복약
        </Typography>
      </div>
    ),
  },
];

export const TabMenu: React.FC<TabMenuProps> = ({ 
  contents,
  activeTab: externalActiveTab,
  onTabChange
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(data[0].id);
  const activeTab = externalActiveTab || internalActiveTab;

  const items = data.map((label, index) => ({
    ...label,
    content: contents[index]
  }));

  const handleTabClick = (tabId: string) => {
    setInternalActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div>
      <div>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            css={labelCss(item.id, activeTab)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div css={contentCss}>
        {items.find(item => item.id === activeTab)?.content}
      </div>
    </div>
  );
};
