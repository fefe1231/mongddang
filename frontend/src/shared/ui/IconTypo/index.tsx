/** @jsxImportSource @emotion/react */
import { IconTypoProps } from './IconTypo.types';
import { containerCss, iconCss, menuCss } from './IconTypo.styles';
import { Typography } from '../Typography';

export const IconTypo = ({ 
  icon,  // 이제 string 타입으로 받습니다
  menu,
  selected = false,
  ...props
}: IconTypoProps) => {
  return (
    <div css={containerCss} {...props}>
      <img 
        css={iconCss} 
        src={icon} 
        alt={menu}
      />
      <Typography css={menuCss(selected)}>{menu}</Typography>
    </div>
  );
};