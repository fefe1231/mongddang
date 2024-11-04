/** @jsxImportSource @emotion/react */

import { Modal } from '@/shared/ui/Modal';
import { mailBoxContainer } from './MailBox.styles';
import { TopBar } from '@/shared/ui/TopBar';

type MailBoxProps = {
    closeMailBox: () => void
}

const MailBox = (props:MailBoxProps) => {
  return (
    <Modal css={mailBoxContainer}>
      <TopBar type="modal" iconHandler={()=>{props.closeMailBox()}}>알림함</TopBar>
      <div></div>
    </Modal>
  );
};

export default MailBox;
