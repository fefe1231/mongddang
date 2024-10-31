/** @jsxImportSource @emotion/react */
import { Modal } from '@/shared/ui/Modal';
import { Notification } from '@/shared/ui/Notification';
import { Typography } from '@/shared/ui/Typography';
import React from 'react';

export const OwnModal = () => {
  return (
    <>
    <Modal>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Typography
          color="dark"
          size="1.75"
          weight={700}
        >
          이것은 모달입니다
        </Typography>
      </div>
    </Modal>
    </>
  );
};
