/** @jsxImportSource @emotion/react */

import { IconTypo } from '@/shared/ui/IconTypo';
import { btn, btnGroup } from './MenuBtnGroup.styles';
import { menuBtnData } from '../../constants/menuBtnData';
import { useNavigate } from 'react-router-dom';

const MenuBtnGroup = () => {
  const navigate = useNavigate();
  return (
    <div css={btnGroup}>
      {menuBtnData.map((item, i) => {
        return (
          <div
            css={btn}
            onClick={() => {
              navigate(item.urlTo);
            }}
            key={`menuBtn-${i}`}
          >
            <IconTypo icon={item.icon} menu={item.menu} />
          </div>
        );
      })}
    </div>
  );
};

export default MenuBtnGroup;
