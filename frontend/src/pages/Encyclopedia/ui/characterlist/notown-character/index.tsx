/** @jsxImportSource @emotion/react */
import { IconTypo } from '@/shared/ui/IconTypo';
import { containerCss } from './styles';
import { ICharacterData } from '@/pages/Encyclopedia/model/types';
interface OwnCharacterProps {
  data: ICharacterData;
}
export const Notowncharacter = ({ data }: OwnCharacterProps) => {
  return (
    <>
      <div css={containerCss}>
        <IconTypo
          fontSize="1"
          icon="/img/말랑3.png"
          menu={data.name}
          size={5}
          disabled
        />
      </div>
    </>
  );
};
