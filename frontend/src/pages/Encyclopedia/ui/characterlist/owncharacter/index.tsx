/** @jsxImportSource @emotion/react */
import { IconTypo } from '@/shared/ui/IconTypo';
import { containerCss } from './styles';
import { ICharacterData } from '@/pages/encyclopedia/model/types';
interface OwnCharacterProps {
  data: ICharacterData;
}

export const Owncharacter = ({ data }: OwnCharacterProps) => {
  return (
    <>
      <div css={containerCss}>
        <IconTypo
          fontSize="1"
          icon="/img/%EB%A7%90%EB%9E%911.png"
          menu={data.name}
          size={5}
        />
      </div>
    </>
  );
};
