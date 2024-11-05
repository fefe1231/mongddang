/** @jsxImportSource @emotion/react */
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Modal } from '@/shared/ui/Modal';
import { Typography } from '@/shared/ui/Typography';
import { base, modalCss, xiconCss, storyTypographyCss } from './styles';
import { HiOutlineX } from 'react-icons/hi';
import { Chip } from '@/shared/ui/Chip';
import { ICharacterData } from '@/pages/Encyclopedia/types';

interface OwnModalProps {
  setstate: (value: boolean) => void;
  data: ICharacterData | null;
}

export const OwnModal = ({ setstate, data }: OwnModalProps) => {
  return (
    <div>
      <Modal height={40} width={70} css={modalCss}>
        <Icon size={2} css={xiconCss} onClick={() => setstate(false)}>
          <HiOutlineX />
        </Icon>
        <div css={base}>
          <Chip border={0.625} color="primary" fontSize={1} fontWeight={700}>
            {data?.name}
          </Chip>
          <Icon size={5}>
            <img alt="icon-1" src="/img/말랑1.png" />
          </Icon>
          <Typography 
            color="dark" 
            size="1" 
            weight={600} 
            css={storyTypographyCss}
          >
            {data?.story}
          </Typography>
          <Button
            handler={() => {}}
            color="dark"
            disabled
            fontSize="1"
            variant="contained"
          >
            대장
          </Button>
        </div>
      </Modal>
    </div>
  );
};