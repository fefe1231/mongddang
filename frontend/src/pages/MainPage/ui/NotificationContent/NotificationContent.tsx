/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import {
  container,
  imgCss,
  noNotificationCss,
  notificationItemCss,
  notificationListCss,
} from './NotificationContent.styles';
import { useState } from 'react';
import {
  useNotificationQuery,
  useNotificationReadMutation,
} from '../../model/useNotificationQuery';
import Loading from '@/shared/ui/Loading';
import { mainIcons } from '../../constants/iconsData';

type NotificationItem = {
  notificationId: number;
  category: string;
  content: string;
  createdAt: Date;
};

const NotificationContent = () => {
  const { data: notifications, isLoading } = useNotificationQuery();
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  if (isLoading) return <Loading />;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.changedTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    if (deltaX > 0) {
      setCurrentX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (currentX > 100) {
      console.log('삭제');
    }
    setCurrentX(0);
  };

  return (
    <div css={container}>
      <div css={notificationListCss}>
        {notifications ? (
          notifications.map((notification: NotificationItem) => {
            return (
              <div
                css={notificationItemCss}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                key={`notification-${notification.notificationId}`}
              >
                <Typography color="dark" size="1" weight={500}>
                  {notification.content}
                </Typography>
              </div>
            );
          })
        ) : (
          <div css={noNotificationCss}>
            <img src={mainIcons.sleepMongddang} alt="sleepMong" css={imgCss} />
            <Typography color="dark" size="1" weight={500}>
              알림이 없어요
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationContent;
