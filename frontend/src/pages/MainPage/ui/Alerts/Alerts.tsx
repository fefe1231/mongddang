/** @jsxImportSource @emotion/react */

import { Notification } from '@/shared/ui/Notification';
import {
  bloodSugarTextCss,
  endEatAlertCss,
  bloodSugarAlertCss,
} from './Alerts.styles';
import { endEating } from '../../api/dietApi';
import { Typography } from '@/shared/ui/Typography';

type AskEndRoutineAlertProps = {
  accessToken: string | null;
  handleAlert: (status: string) => void;
  routineValue: string;
  changeRoutine: (currentRoutine: string) => void;
  handleBloodSugar: (bloodSugar: number) => void;
};

type BloodSugarProps = {
  routineValue: string;
  bloodSugar: number;
  handleAlert: (status: string) => void;
};

// 루틴 시작 후 혈당 알림
export const StartRoutineAlert = (props: BloodSugarProps) => {
  return (
    <Notification
      ment={
        <div css={bloodSugarTextCss}>
          {props.routineValue === '먹는 중' ? (
            <Typography color="dark" size="1" weight={500}>
              🍽️ 맛있게 먹어! 🍽️
            </Typography>
          ) : (
            <></>
          )}
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

// 루틴 종료 여부 질문 알림
export const AskEndRoutineAlert = (props: AskEndRoutineAlertProps) => {
  const handleEndRoutine = async () => {
    const response = await endEating(props.accessToken);
    if (response.code === 200) {
      props.handleBloodSugar(response.data.bloodSugarLevel);
    }
  };

  return (
    <Notification
      ment={props.routineValue === '먹는 중' ? '다 먹었어?' : ''}
      twoBtn
      type="confirm"
      css={endEatAlertCss}
      children={
        props.routineValue === '먹는 중' ? ['아니, 아직', '응, 다 먹었어!'] : []
      }
      bluehandler={() => {
        handleEndRoutine();
        props.handleAlert('endRoutine');
        props.changeRoutine('먹기 끝');
      }}
      redHandler={() => {
        props.handleAlert('');
      }}
    />
  );
};

// 루틴 종료 후 혈당 알림
export const EndRoutineAlert = (props: BloodSugarProps) => {
  return (
    <Notification
      ment={
        <div css={bloodSugarTextCss}>
          {props.routineValue === '먹기 끝' ? (
            <Typography color="dark" size="1" weight={500}>
              🍽️ 다 먹었다! 🍽️
            </Typography>
          ) : (
            <></>
          )}

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
