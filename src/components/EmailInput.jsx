// src/components/EmailInput.jsx
import "../css/EmailInput.css";
import { useState } from "react";
import ShareCompletionToast from "./ShareCompletionToast";

function EmailInput({ input, setInput, setSharingButtonClick, resultData }) {
  const [isShareButtonClick, setIsShareButtonClick] = useState(false);
  const [isInputNone, setIsInputNone] = useState(true);

  const handleShareSubmit = async () => {
    // 버튼 클릭 또는 Enter 시 즉시 토스트 표시
    setTimeout(() => {
      setIsShareButtonClick(true);
    }, 500);
    setInput("");

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL ||
        (import.meta.env.MODE === "development"
          ? "http://localhost:3001"
          : "http://ec2-43-201-95-227.ap-northeast-2.compute.amazonaws.com:3001");
      const url = `${API_BASE_URL}/api/share`;
      console.log("요청 URL:", url);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input,
          result: { ...resultData },
        }),
      });

      const text = await res.text();
      console.log("서버 응답 원문:", text);

      try {
        const data = JSON.parse(text);
        console.log("파싱된 데이터:", data);
      } catch (e) {
        console.error("JSON 파싱 실패", e);
      }
    } catch (e) {
      console.error("네트워크 오류:", e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleShareSubmit();
  };

  if (isShareButtonClick) {
    setTimeout(() => {
      setIsInputNone(false);
    }, 2000);
  }

  if (isShareButtonClick) {
    setTimeout(() => {
      setSharingButtonClick(false);
    }, 3500);
  }

  return (
    <>
      {isShareButtonClick && (
        <ShareCompletionToast
          onClose={() => setIsShareButtonClick(false)}
          style={{ zIndex: 100001 }}
          setSharingButtonClick={setSharingButtonClick}
        />
      )}

      <div className="container" style={{ zIndex: 100000 }}>
        <i
          className="bi bi-x-lg close-button"
          onClick={(e) => {
            setSharingButtonClick(false);
          }}
          style={{ display: `${!isInputNone ? "none" : ""}` }}
        ></i>
        <div
          className="email-info-input"
          style={{ display: `${!isInputNone ? "none" : ""}` }}
        >
          <input
            className="email-input jua-regular"
            type="email"
            placeholder="이메일을 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button
            className="email-send-button jua-regular"
            onClick={handleShareSubmit}
          >
            결과 공유하기
          </button>
        </div>
      </div>
    </>
  );
}

export default EmailInput;
