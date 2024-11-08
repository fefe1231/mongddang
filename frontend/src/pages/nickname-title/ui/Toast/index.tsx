/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


interface IToast {
  title: string; // title의 스펠링 수정
}

const toastCss = css`
  position: fixed;
  top: 20px; /* 화면 상단에 위치 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* 다른 요소 위에 표시 */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  opacity: 0; /* 초기 상태 */
  animation: fadeIn 0.5s forwards, fadeOut 0.5s forwards 4.5s; /* 애니메이션 추가 */

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
`;

const AchievementToast = ({ title }:IToast) => {
  return (
    <div css={toastCss}>
      <div className="font-bold">{title}</div>
      <div>업적이 성공적으로 획득되었습니다!</div>
    </div>
  );
};

export default AchievementToast;