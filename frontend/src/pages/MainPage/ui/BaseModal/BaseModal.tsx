/** @jsxImportSource @emotion/react */

import { Modal } from '@/shared/ui/Modal';
import { baseModalContainer, baseModalContent } from './BaseModal.styles';
import { TopBar } from '@/shared/ui/TopBar';
import DailyMissionContent from '../DailyMissionContent/DailyMissionContent';
import NotificationContent from '../NotificationContent/NotificationContent';

type BaseModalProps = {
  contentType: string;
  closeBaseModal: () => void;
};

const BaseModal = (props: BaseModalProps) => {
  const { contentType } = props;
  return (
    <Modal css={baseModalContainer}>
      <TopBar
        type="modal"
        iconHandler={() => {
          props.closeBaseModal();
        }}
      >
        {
          contentType === 'dailyMission' ? '오늘의 퀘스트' : contentType === 'notification' ? '알림함' : ''
        }
      </TopBar>
      <div css={baseModalContent}>
        {contentType === 'dailyMission' ? (
          <DailyMissionContent />
        ) : contentType === 'notification' ? (
          <NotificationContent/>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default BaseModal;
