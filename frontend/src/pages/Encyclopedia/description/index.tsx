/** @jsxImportSource @emotion/react */
import { Icon } from '@/shared/ui/Icon';
import { base, containerCss } from './styles';
import { Typography } from '@/shared/ui/Typography';

export const Description = () => {
  return (
    <div css={base}>
      <Icon size={5}>
        <img alt="icon-1" src="/img/%EB%A7%90%EB%9E%912.png" />
      </Icon>
      <div css={containerCss}>
        <Typography color="dark" size="0.75" weight={600}>
          그동안 모은 별가루로 
          <br />
          내 친구들을 찾을 수 있어!
        </Typography>
      </div>
    </div>
  );
};
