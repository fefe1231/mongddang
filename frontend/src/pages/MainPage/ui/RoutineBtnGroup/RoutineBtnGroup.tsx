/** @jsxImportSource @emotion/react */

import { Icon } from '@/shared/ui/Icon';
import {
  container,
  dietCss,
  endBtnCss,
  routineGroupCss,
  timerCss,
} from './RoutineBtnGroup.styles';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';

type RoutineBtnGroupProps = {
  endRoutine: () => void;
  handleDietModal: () => void;
  routine: string;
  handleEndEatAlert: (status:boolean) => void;
};

const RoutineBtnGroup = (props: RoutineBtnGroupProps) => {
  return (
    <div css={container}>
      {props.routine === '' ? (
        <div css={routineGroupCss}>
          <Icon
            size={2.5}
            onClick={() => {
              props.handleDietModal();
            }}
          >
            <img alt="icon-0" src="/img/%EB%A7%90%EB%9E%911.png" />
          </Icon>
          <Icon size={2.5}>
            <img alt="icon-1" src="/img/%EB%A7%90%EB%9E%912.png" />
          </Icon>
          <Icon size={2.5}>
            <img alt="icon-2" src="/img/%EB%A7%90%EB%9E%913.png" />
          </Icon>
        </div>
      ) : props.routine === 'diet' ? (
        <div css={dietCss}>
          <div css={timerCss}>
            <Typography color="dark" size="1" weight={500}>
              먹는 중
            </Typography>
            <Typography color="dark" size="1" weight={400}>
              00:01
            </Typography>
          </div>
          <Button
            color="primary"
            fontSize="1"
            isShadow
            variant="contained"
            handler={() => {props.handleEndEatAlert(true)}}
            css={endBtnCss}
          >
            먹기 끝
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoutineBtnGroup;
