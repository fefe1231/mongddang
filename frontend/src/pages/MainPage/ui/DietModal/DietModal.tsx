/** @jsxImportSource @emotion/react */

import { Modal } from '@/shared/ui/Modal';
import {
  modalContainer,
  modalContent,
  modalTopBar,
} from './DietModal.styles';
import { TopBar } from '@/shared/ui/TopBar';
import DietModalBtnGroup from '../DietModalBtnGroup/DietModalBtnGroup';

type DietModalProps = {
  closeDietModal: () => void
}

const DietModal = (props:DietModalProps) => {
  return (
    <div>
      <Modal css={modalContainer}>
        <TopBar type="modal" css={modalTopBar} iconHandler={()=>{props.closeDietModal()}}>
          지금 뭐 먹어?
        </TopBar>
        <div css={modalContent}>
          <DietModalBtnGroup/>
        </div>
      </Modal>
    </div>
  );
};

export default DietModal;
