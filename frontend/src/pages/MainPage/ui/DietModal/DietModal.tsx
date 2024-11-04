/** @jsxImportSource @emotion/react */

import { Modal } from '@/shared/ui/Modal';
import { inputContainer, modalContainer, modalContent, modalTopBar } from './DietModal.styles';
import { TopBar } from '@/shared/ui/TopBar';
import DietModalBtnGroup from '../DietModalBtnGroup/DietModalBtnGroup';
import DietImage from '../DietImage/DietImage';
import { TextField } from '@/shared/ui/TextField';

type DietModalProps = {
  closeDietModal: () => void;
};

const DietModal = (props: DietModalProps) => {
  return (
    <div>
      <Modal css={modalContainer}>
        <TopBar
          type="modal"
          css={modalTopBar}
          iconHandler={() => {
            props.closeDietModal();
          }}
        >
          지금 뭐 먹어?
        </TopBar>
        <div css={modalContent}>
          <DietModalBtnGroup />
          <DietImage />
          <TextField
            color="dark"
            defaultValue=""
            label=""
            maxRows={10}
            multiLine
            placeholder='뭐 먹는지 적어줘! (✨사진, 글 둘 중 하나는 꼭 해줘:))'
            type="text"
            variant="outlined"
            css={inputContainer}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DietModal;
