/** @jsxImportSource @emotion/react */
import { TopBar } from '@/shared/ui/TopBar';
import space from '../../assets/img/space.png';
import { containerCss, imgCss } from '../Encyclopedia/styles';
import { Description } from '../Encyclopedia/description';
import { Toggle } from '@/shared/ui/Toggle';
import { Typography } from '@/shared/ui/Typography';
import { TitleComponent } from './ui/title-component';
import { toggleContainerCss } from './styles';
import { useQuery } from '@tanstack/react-query';
import { getTitleInfo } from './api';
import { ItitleData } from './types';

export const NicknameTitle = () => {
  const TitleQuery = useQuery({
    queryKey: ['title'],
    queryFn: async () => {
      const accessToken = localStorage.getItem('accessToken') || ''; // 로컬 스토리지에서 accessToken 가져오기
      console.log(accessToken);
      return await getTitleInfo(accessToken);
    },
  });

  console.log(TitleQuery.data?.data);

  return (
    <div>
      <TopBar type="iconpage">칭호 도감</TopBar>
      <img css={imgCss} src={space} alt="배경 이미지" />
      <div css={containerCss}>
        <Description>
          <div>
            업적을 달성하면 <br /> 칭호를 얻을 수 있어!
          </div>
        </Description>
      </div>
      <div css={toggleContainerCss}>
        <Typography color="light" size="0.75" weight={700}>
          전체
        </Typography>
        <Toggle color="primary" size={2.5} />
      </div>
      {TitleQuery.data?.data?.data.map((data: ItitleData) => (
        <TitleComponent key={data.titleId} title={data} />
      ))}
    </div>
  );
};
