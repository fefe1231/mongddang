/** @jsxImportSource @emotion/react */

import { Notification } from '@/shared/ui/Notification';
import { endEatAlertCss } from './Alerts.styles';

type EndEatAlertProps = {
  accessToken: string | null;
  handleEndEatAlert: (status: boolean) => void;
};

export const EndEatAlert = (props: EndEatAlertProps) => {
  
  return (
    <Notification
      ment="다 먹었어?"
      twoBtn
      type="confirm"
      css={endEatAlertCss}
      children={['아니, 아직', '응, 다 먹었어!']}
      bluehandler={() => {}}
      redHandler={() => {
        props.handleEndEatAlert(false);
      }}
    />
  );
};
