/** @jsxImportSource @emotion/react */

import { Notification } from '@/shared/ui/Notification';
import {
  bloodSugarTextCss,
  endEatAlertCss,
  bloodSugarAlertCss,
} from './Alerts.styles';
import { endEating } from '../../api/dietApi';
import { Typography } from '@/shared/ui/Typography';

type EndEatAlertProps = {
  accessToken: string | null;
  handleAlert: (status: string) => void;
  changeRoutine: (currentRoutine: string) => void;
  handleBloodSugar: (bloodSugar: number) => void;
};

type BloodSugarProps = {
  bloodSugar: number;
  handleAlert: (status: string) => void;
};

// 식사 시작 후 혈당 알림
export const StartEatAlert = (props: BloodSugarProps) => {
  return (
    <Notification
      ment={
        <div css={bloodSugarTextCss}>
          <Typography color="dark" size="1" weight={500}>
            🍽️ 맛있게 먹어! 🍽️
          </Typography>
          <Typography color="dark" size="1" weight={600}>
            {`혈당: ${props.bloodSugar}`}
          </Typography>
        </div>
      }
      type="primary"
      css={bloodSugarAlertCss}
      children={['확인']}
      bluehandler={() => {
        props.handleAlert('');
      }}
    />
  );
};

// 식사 종료 여부 질문 알림
export const EndEatAlert = (props: EndEatAlertProps) => {
  const handleEndEating = async () => {
    const response = await endEating(props.accessToken);
    if (response.code === 200) {
      props.handleBloodSugar(response.data.bloodSugarLevel);
    }
  };

  return (
    <Notification
      ment="다 먹었어?"
      twoBtn
      type="confirm"
      css={endEatAlertCss}
      children={['아니, 아직', '응, 다 먹었어!']}
      bluehandler={() => {
        handleEndEating();
        props.handleAlert('endEat');
        props.changeRoutine('');
      }}
      redHandler={() => {
        props.handleAlert('');
      }}
    />
  );
};

// 식사 종료 후 혈당 알림
export const EndEatBloodSugarAlert = (props: BloodSugarProps) => {
  return (
    <Notification
      ment={
        <div css={bloodSugarTextCss}>
          <Typography color="dark" size="1" weight={500}>
            🍽️ 다 먹었다! 🍽️
          </Typography>
          <Typography color="dark" size="1" weight={600}>
            {`혈당: ${props.bloodSugar}`}
          </Typography>
        </div>
      }
      type="primary"
      css={bloodSugarAlertCss}
      children={['확인']}
      bluehandler={() => {
        props.handleAlert('');
      }}
    />
  );
};
