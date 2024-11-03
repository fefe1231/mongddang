/** @jsxImportSource @emotion/react */

import { IconTypo } from '@/shared/ui/IconTypo';
import { btn, btnGroup } from './MenuBtnGroup.styles';
import { menuBtnData } from '../../constants/menuBtnData';


const MenuBtnGroup = () => {
  return (
    <div css={btnGroup}>
      {menuBtnData.map((item) => {
        return (
          <div css={btn}>
            <IconTypo icon={item.icon} menu={item.menu} />
          </div>
        );
      })}
    </div>
  );
};

export default MenuBtnGroup;
