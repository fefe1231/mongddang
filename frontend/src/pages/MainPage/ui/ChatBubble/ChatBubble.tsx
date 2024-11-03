/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import { container } from './ChatBubble.styles';


const ChatBubble = () => {
  return (
    <div css={container}>
      <Typography color="dark" size="1" weight={600}>
        <span>
          좋은 아침이야! <br />
          오늘도 잘 부탁해
        </span>
      </Typography>
    </div>
  );
};

export default ChatBubble;
