/** @jsxImportSource @emotion/react */
import { Icon } from '@/shared/ui/Icon';
import { base, containerCss } from './styles';
import { Typography } from '@/shared/ui/Typography';
import { ReactNode } from 'react';

interface DescriptionProps {
  children: ReactNode;
}

export const Description = ({ children }: DescriptionProps) => {
  return (
    <div css={base}>
      <Icon size={5}>
        <img alt="icon-1" src="/img/%EB%A7%90%EB%9E%912.png" />
      </Icon>
      <div css={containerCss}>
        <Typography color="dark" size="0.75" weight={600}>
          {children}
        </Typography>
      </div>
    </div>
  );
};
