/** @jsxImportSource @emotion/react */

import MenuBtnGroup from '@/features/MenuBtnGroup/ui/MenuBtnGroup';
import {
  menuBase,
  menuBtnContainer,
  menuBtnGroup,
  menuContent,
} from './styles';
import CloseBtn from './ui/CloseBtn/CloseBtn';

const Menu = () => {
  return (
    <div css={menuBase}>
      <div css={menuContent}>
        {/* 메뉴 버튼 모음 */}
        <div css={menuBtnContainer}>
          <div css={menuBtnGroup}>
            <MenuBtnGroup userRole={'child'}/>
          </div>
        </div>
      </div>
      {/* 닫기 버튼 */}
      <CloseBtn />
    </div>
  );
};

export default Menu;
