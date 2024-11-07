/** @jsxImportSource @emotion/react */

import { Typography } from "@/shared/ui/Typography";
import { base } from "../item/stylest";

export const GptContent = () => {
  return (
    <div css={base}>
      <Typography color="dark" size="1" weight={600}>
        이번주 혈당 보고서
      </Typography>
      <div style={{ display: 'flex', alignItems: 'flex-end' , marginTop:'0.5rem'}}>
        <Typography color="dark" size="1" weight={500}>
          내용
        </Typography>

      </div>
    </div>
  );
};
