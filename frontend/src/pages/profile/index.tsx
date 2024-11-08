/** @jsxImportSource @emotion/react */
import { TopBar } from '@/shared/ui/TopBar';
import { Icon } from '@/shared/ui/Icon';
import { base, containerCss } from './ui/styles';
import { Chip } from '@/shared/ui/Chip';
import { imgCss } from '../Encyclopedia/ui/styles';
import space from '../../assets/img/space.png';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from './api/mypage-api';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const nav = useNavigate();
  const ProfileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken') || ''; // 로컬 스토리지에서 accessToken 가져오기
      return await getUserInfo(accessToken);
    },
  });

  const inviteCode = ProfileQuery.data?.data?.data?.invitationCode; // 초대 코드 가져오기

  const copyToClipboard = () => {
    if (inviteCode) {
      navigator.clipboard
        .writeText(inviteCode)
        .then(() => {
          alert('초대 코드가 복사되었습니다!');
        })
        .catch((err) => {
          console.error('복사 실패:', err);
        });
    } else {
      alert('초대 코드가 없습니다.');
    }
  };

  console.log(ProfileQuery);

  return (
    <div>
      <TopBar type="iconpage" iconHandler={() => nav('/menu')}>
        프로필
      </TopBar>
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
        <Chip border={1} color="primary" fontSize={0.8} fontWeight={600}>
          프로필
        </Chip>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <Typography color="dark" size="1" weight={700}>
            이름: {ProfileQuery.data?.data.data.name}
          </Typography>
          <Typography color="dark" size="1" weight={700}>
            닉네임: {ProfileQuery.data?.data.data.nickname}
          </Typography>
          <Typography color="dark" size="1" weight={700}>
            성별:
            {ProfileQuery.data?.data.data.gender === 'male' ? '남자' : '여자'}
          </Typography>
          <Typography color="dark" size="1" weight={700}>
            생년월일: {ProfileQuery.data?.data.data.birth}
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
          handler={copyToClipboard}
          color="secondary"
          fontSize="1.25"
          variant="contained"
          fullwidth
        >
          초대코드 복사
        </Button>
        <Button
          handler={() => nav('/nickname/edit')}
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
