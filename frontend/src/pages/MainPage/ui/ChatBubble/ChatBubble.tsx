/** @jsxImportSource @emotion/react */

import { Typography } from '@/shared/ui/Typography';
import { container } from './ChatBubble.styles';
import { useChatWithMongddangStore } from '../../model/useChatWithMongddangStore';
import { FormEvent, useState } from 'react';

const ChatBubble = () => {
  const { displayMessage, startChat, sendChatMessage, finishChat } =
    useChatWithMongddangStore();

  const [chatInput, setChatInput] = useState<string>('');
  const [isChatStarted, setIsChatStarted] = useState<boolean>(false);

  const handleStartChat = async () => {
    await startChat();
    setIsChatStarted(true);
  };

  const handleFinishChat = async () => {
    await finishChat();
    setIsChatStarted(false);
  };

  const handleSendChatMessage = async (e: FormEvent) => {
    e.preventDefault();
    setChatInput('');
    sendChatMessage(chatInput);
  };

  const mongddangDefaultMessages = '좋은 아침이야! 오늘도 잘 부탁해';

  return (
    <div css={container} style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography color="dark" size="1" weight={600}>
        <span>{displayMessage || mongddangDefaultMessages}</span>
      </Typography>

      <Typography
        color="primary"
        size="0.75"
        weight={600}
        onClick={isChatStarted ? handleFinishChat : handleStartChat}
      >
        {isChatStarted ? (
          <span>대화 종료하기</span>
        ) : (
          <span>대화 시작하기</span>
        )}
      </Typography>
      {isChatStarted && (
        <form onSubmit={(e) => handleSendChatMessage(e)}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            style={{ width: '100%' }}
          />
          <button type="submit">전송</button>
        </form>
      )}
    </div>
  );
};

export default ChatBubble;
