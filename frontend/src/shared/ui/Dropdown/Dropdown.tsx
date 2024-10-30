/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { DropdownProps } from './Dropdown.types';
import { styles } from './Dropdown.styles';
import { RiArrowRightSFill } from 'react-icons/ri';
import { Icon } from '../Icon';
import { Button } from '../Button';

export const Dropdown = ({
  options,
  onSelect,
  selectedValue,
  buttonLabel = '선택하세요',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div css={styles.dropdownContainer}>
      <Button css={styles.button} fontSize="1" handler={handleButtonClick}>
        {selectedValue || buttonLabel}
        <Icon size={2} css={isOpen ? styles.iconOpen : styles.iconClose}>
          <RiArrowRightSFill />
        </Icon>
      </Button>

      {isOpen && (
        <div css={styles.dropdown}>
          {options.map((option) => (
            <div
              key={option}
              css={styles.option}
              className={selectedValue === option ? 'selected' : ''}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
