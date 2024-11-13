/** @jsxImportSource @emotion/react */
import { SlQuestion } from 'react-icons/sl';
import { containerCss, fitCss, textCss } from './styles';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/shared/ui/Icon';
import { Typography } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';

interface NoResultProps {
  fit?: boolean;
  msg: string;
  url?: string;
  contents?: object;
  btnmsg?: string;
}

const NoResult = ({
  fit = true,
  msg,
  url,
  contents,
  btnmsg,
}: NoResultProps) => {
  const nav = useNavigate();
  const handleButtonClick = () => {
    if (contents) {
      nav(url!, { state: contents });
    } else {
      nav(url!);
    }
  };
  return (
    <div css={[containerCss, fit && fitCss]}>
      <Icon size={5} color="grey">
        <SlQuestion />
      </Icon>
      <Typography size='1' color="dark" css={textCss}>
        {msg}
      </Typography>
      {url ? (
        <Button
          color="primary"
          handler={handleButtonClick}
          variant="contained"
        >
          {btnmsg}
        </Button>
      ) : undefined}
    </div>
  );
};

export default NoResult;
