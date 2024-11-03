/** @jsxImportSource @emotion/react */

import {
  menuBase,
  menuBtnContainer,
  menuBtnGroup,
  menuContent,
} from './styles';
import MenuBtnGroup from './ui/MenuBtnGroup/MenuBtnGroup';

type Props = {};

const Menu = (props: Props) => {
  return (
    <div css={menuBase}>
      <div css={menuContent}>
        <div css={menuBtnContainer}>
          <div css={menuBtnGroup}>
            <MenuBtnGroup />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
