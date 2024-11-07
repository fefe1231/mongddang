/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import { base } from './stylest';

interface ItemProps {
  title: string;
  ment: string;
  unit: string;
}

export const Item = ({ title, ment, unit }: ItemProps) => {
  return (
    <div css={base}>
      <Typography color="dark" size="1" weight={500}>
        {title}
      </Typography>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Typography color="dark" size="1.25" weight={600}>
          {ment}
        </Typography>
        <Typography
          color="dark"
          size="0.75"
          weight={500}
          style={{ marginLeft: '4px', marginBottom: '2px' }} // 아래로 살짝 이동
        >
          {unit}
        </Typography>
      </div>
    </div>
  );
};
