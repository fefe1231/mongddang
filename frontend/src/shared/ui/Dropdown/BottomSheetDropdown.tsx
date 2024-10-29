/** @jsxImportSource @emotion/react */


import React from 'react';
import { createPortal } from 'react-dom';
import { BottomSheetDropdownProps } from './BottomSheetDropdown.types';
import { styles } from './BottomSheetDropdown.styles';

export const BottomSheetDropdown = ({
  options,
  onSelect,
  isOpen,
  onClose,
  selectedValue
}: BottomSheetDropdownProps) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div css={styles.overlay} onClick={onClose} />
      <div css={styles.bottomSheet}>
        {options.map((option) => (
          <div
            key={option}
            css={styles.option}
            className={selectedValue === option ? 'selected' : ''}
            onClick={() => {
              onSelect(option);
              onClose();
            }}
          >
            {option}
          </div>
        ))}
      </div>
    </>,
    document.body
  );
};