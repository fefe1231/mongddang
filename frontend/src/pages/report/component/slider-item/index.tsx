/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import { base } from '../item/stylest';
import { Slider } from '@/shared/ui/Slider';
import { SliderCss, containerCss } from './styles';

interface ItemProps {
  title: string;
  ment: string;
  unit: string;
}

export const SliderItem = ({ title, ment, unit }: ItemProps) => {
  return (
    <div css={base}>
      <Typography color="dark" size="1" weight={500}>
        {title}
      </Typography>
      <div css={containerCss}>
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
        <Slider
          css={SliderCss}
          blueMent="'권장'"
          max={50}
          redMent="'주의'"
          standard={30}
          value={30}
        />
      </div>
    </div>
  );
};