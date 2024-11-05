/** @jsxImportSource @emotion/react */
import { IconTypo } from '@/shared/ui/IconTypo';
import { containerCss, newCss } from './styles';
import { Typography } from '@/shared/ui/Typography';
import { ICharacterData } from '@/pages/Encyclopedia/types';
interface OwnCharacterProps {
  data: ICharacterData;
}
export const Newcharacter = ({data}: OwnCharacterProps

) => {
  return (
    <div css={containerCss}>
      <IconTypo
        fontSize="1"
        icon="/img/말랑2.png"
        menu={data.name}
        size={5}
      />
      <Typography
        color="primary"
        size="1"
        weight={600}
        css={newCss}
      >
        New!!
      </Typography>
    </div>
  );
};
