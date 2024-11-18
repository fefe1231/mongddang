/** @jsxImportSource @emotion/react */

import { usePushNotificationStore } from "@/shared/model/usePushNotificationStore";
import { Notification } from "../Notification";
import { Typography } from "../Typography";
import { container, imgCss, textCss } from "./PushNotification.styles";
import { mainIcons } from "@/pages/MainPage/constants/iconsData";

export const BloodSugarNotification = () => {
  const { title, message, removePushNotification } = usePushNotificationStore();
  return (
    <Notification
      bluehandler={() => {
        removePushNotification();
      }}
      ment={
        <div css={textCss}>
          <img src={mainIcons.alertMongddang} alt="medication" css={imgCss} />
          <Typography color="dark" size="1.25" weight={600}>
            {title}
          </Typography>
          <Typography color="dark" size="1" weight={500}>
            {message}
          </Typography>
        </div>
      }
      type="alert"
      css={container}
    />
  );
};