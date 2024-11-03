/** @jsxImportSource @emotion/react */
import { Typography } from '@/shared/ui/Typography';
import { DietModalBtnData } from '../../constants/dietModalBtnData';
import { Button } from '@/shared/ui/Button';
import { btn, btnGroup, btnTextCss } from './DietModalBtnGroup.styles';
import { useState } from 'react';

const DietModalBtnGroup = () => {
  const [activeBtn, setActiveBtn] = useState(100);

  const handleBtnClick = (btnId: number) => {
    if (activeBtn === btnId) {
      setActiveBtn(100);
    } else {
      setActiveBtn(btnId);
    }
  };

  return (
    <div css={btnGroup}>
      {DietModalBtnData.map((item, btnId) => {
        return (
          <Button
            key={`dietModalBtn-${btnId}`}
            color="light"
            fontSize="1"
            fullwidth
            variant="outlined"
            handler={() => {
              handleBtnClick(btnId);
            }}
            css={btn}
            style={{
              backgroundColor: activeBtn === btnId ? '#8FDCFF' : '#fff',
              color: activeBtn === btnId ? '#fff' : 'black',
            }}
          >
            <div css={btnTextCss}>
              <img src={item.icon} />
              <Typography color="dark" size="1" weight={500}>
                {item.text}
              </Typography>
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default DietModalBtnGroup;
