/** @jsxImportSource @emotion/react */

import { Modal } from '@/shared/ui/Modal';
import { baseModalContainer } from './BaseModal.styles';
import { TopBar } from '@/shared/ui/TopBar';

type BaseModalProps = {
    closeBaseModal: () => void
}

const BaseModal = (props:BaseModalProps) => {
  return (
    <Modal css={baseModalContainer}>
      <TopBar type="modal" iconHandler={()=>{props.closeBaseModal()}}>알림함</TopBar>
      <div></div>
    </Modal>
  );
};

export default BaseModal;
