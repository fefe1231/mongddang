/** @jsxImportSource @emotion/react */

import {
  menuBase,
  menuBtnContainer,
  menuBtnGroup,
  menuContent,
} from './styles';
import CloseBtn from './ui/CloseBtn/CloseBtn';
import MenuBtnGroup from './ui/MenuBtnGroup/MenuBtnGroup';

type Props = {};

const Menu = (props: Props) => {
  return (
    <div css={menuBase}>
      <div css={menuContent}>
        {/* 메뉴 버튼 모음 */}
        <div css={menuBtnContainer}>
          <div css={menuBtnGroup}>
            <MenuBtnGroup />
          </div>
        </div>
      </div>
      {/* 닫기 버튼 */}
      <CloseBtn />
    </div>
  );
};

export default Menu;
