import { useEffect } from "react";
import "../css/ShareCompletionToast.css";
import toastBackgroundImage from "../../logo.png"; // 배경 이미지 경로

export default function ShareCompletionToast({ onClose, style }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-container" style={style}>
      <div className="toast-content">
        <img
          src={toastBackgroundImage}
          className="toast-background-image"
          alt="toast background"
        />
        <h1 className="toast-message jua-regular">행운배달이 완료되었어요!</h1>
        <p className="sub-toast-message jua-regular">이메일을 확인해 보세요</p>
      </div>
    </div>
  );
}
