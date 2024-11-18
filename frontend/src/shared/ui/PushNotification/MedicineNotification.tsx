/** @jsxImportSource @emotion/react */

import { takeMedicine } from "@/shared/api/push-notification/takeMedicineApi";
import { usePushNotificationStore } from "@/shared/model/usePushNotificationStore";
import { Notification } from "../Notification";
import { container, imgCss, textCss } from "./PushNotification.styles";
import { mainIcons } from "@/pages/MainPage/constants/iconsData";
import { Typography } from "../Typography";

export const MedicineNotification = () => {
  const { title, message, removePushNotification } = usePushNotificationStore();
  const checkTakeMedicine = () => {
    takeMedicine();
    removePushNotification();
  };
  return (
    <Notification
      bluehandler={() => {
        checkTakeMedicine();
      }}
      ment={
        <div css={textCss}>
          <img src={mainIcons.medication} alt="medication" css={imgCss} />
          <Typography color="dark" size="1.25" weight={600}>
            {title}
          </Typography>
          <Typography color="dark" size="1" weight={500}>
            {message}
          </Typography>
        </div>
      }
      type="primary"
      css={container}
      children={['주사 잘 맞았어!']}
    />
  );
};
