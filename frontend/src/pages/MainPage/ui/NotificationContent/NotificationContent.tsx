/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import {
  container,
  notificationItemCss,
  notificationListCss,
} from './NotificationContent.styles';
import { useState } from 'react';

const NotificationContent = () => {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.changedTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    if (deltaX > 0) {
      setCurrentX(deltaX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (currentX > 100) {
      console.log('삭제');
    }
    setCurrentX(0);
  };

  return (
    <div css={container}>
      <div css={notificationListCss}>
        <div
          css={notificationItemCss}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Typography color="dark" size="1" weight={500}>
            저혈당 증상이 지속되고 있습니다.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default NotificationContent;
