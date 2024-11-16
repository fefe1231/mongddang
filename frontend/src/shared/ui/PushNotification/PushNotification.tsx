/** @jsxImportSource @emotion/react */

import { Notification } from '../Notification';
import { Typography } from '../Typography';
import { container, textCss } from './PushNotification.styles';
import { usePushNotificationStore } from '@/shared/model/usePushNotificationStore';

const PushNotification = () => {
  const { title, message, removePushNotification } = usePushNotificationStore();
  return (
    <>
      {message && (
        <Notification
          bluehandler={() => {
            removePushNotification();
          }}
          ment={
            <div css={textCss}>
              <Typography color="dark" size="1.25" weight={600}>
                {title}
              </Typography>
              <Typography color="dark" size="1" weight={500}>
                {message}
              </Typography>
            </div>
          }
          type="confirm"
          css={container}
        />
      )}
    </>
  );
};

export default PushNotification;
