/** @jsxImportSource @emotion/react */
import { IconTypo } from '@/shared/ui/IconTypo';
import { containerCss } from './styles';
import { ICharacterData } from '@/pages/Encyclopedia/model/types';
import {
  characterImages,
  formatId,
} from '@/pages/Encyclopedia/model/mongddang-img';
import { Icon } from '@/shared/ui/Icon';
interface OwnCharacterProps {
  data: ICharacterData;
}

export const Owncharacter = ({ data }: OwnCharacterProps) => {
  const imageKey = formatId(data.id);
  const imagePath = characterImages[imageKey];

  
  return (
    <>
      <div css={containerCss}>
        <IconTypo fontSize="1" icon={imagePath} menu={data.name} size={5} />
        <Icon size={3}>
          <img alt="icon-0" src="/img/%EB%A7%90%EB%9E%911.png" />
        </Icon>
      </div>
    </>
  );
};
