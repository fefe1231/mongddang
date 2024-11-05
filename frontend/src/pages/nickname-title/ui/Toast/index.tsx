/** @jsxImportSource @emotion/react */

import { Toast } from "@/shared/ui/Toast";
import { containerCss } from "./styles";

export const AchievementToast = () => {
  return (
    <div css={containerCss}>
      <Toast color="secondary" fontSize={1} variant="filled">
        수면 마스터 칭호를 획득했습니다!
        <br />
        당신도 이제 수면 마스터!
      </Toast>
    </div>
  );
};
