/** @jsxImportSource @emotion/react */
import { TopBar } from '@/shared/ui/TopBar';
import { Icon } from '@/shared/ui/Icon';
import { base, containerCss } from './styles';
import { Chip } from '@/shared/ui/Chip';
import { imgCss } from '../Encyclopedia/styles';
import space from '../../assets/img/space.png';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';

export const Profile = () => {
  return (
    <div>
      <TopBar type="iconpage">프로필</TopBar>
      <div css={base}>
        <Icon size={5}>
          <img alt="icon-1" src="/img/%EB%A7%90%EB%9E%912.png" />
        </Icon>
        <Chip border={1} color="primary" fontSize={0.8} fontWeight={600}>
          어린이
        </Chip>
      </div>
      <img css={imgCss} src={space} alt="배경 이미지" />
      <div css={containerCss}>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <Chip border={1} color="primary" fontSize={0.8} fontWeight={600}>
            프로필
          </Chip>
          <Typography color="dark" size="1" weight={700}>
            이름:
          </Typography>
          <Typography color="dark" size="1" weight={700}>
            닉네임:
          </Typography>
          <Typography color="dark" size="1" weight={700}>
            성별:
          </Typography>
          <Typography color="dark" size="1" weight={700}>
            생년월일:
          </Typography>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <Chip border={1} color="primary" fontSize={0.8} fontWeight={600}>
            연결된 보호자
          </Chip>
          <Typography color="dark" size="1" weight={700}>
            김싸피 엄마
          </Typography>
          <Typography color="dark" size="1" weight={700}>
            김싸피 담임쌤
          </Typography>
        </div>
      </div>
      <div style={{ display: 'flex', margin: '0 1rem', gap: '1rem' }}>
        <Button
          handler={() => {}}
          color="secondary"
          fontSize="1.25"
          variant="contained"
          fullwidth
        >
          초대코드 복사
        </Button>
        <Button
          handler={() => {}}
          color="primary"
          fontSize="1.25"
          variant="contained"
          fullwidth
        >
          닉네임 수정
        </Button>
      </div>
    </div>
  );
};
