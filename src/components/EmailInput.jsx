import "../css/EmailInput.css";

function EmailInput({ input, setInput, setSharingButtonClick, resultData }) {
  const handleShareSubmit = async () => {
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

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("JSON 파싱 실패", e);
        return;
      }

      if (res.ok) {
        alert("당신의 행운배달이 완료되었어요!");
      } else {
        alert("행운배달에 실패했어요...");
      }
    } catch (e) {
      console.error("네트워크 오류:", e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleShareSubmit();
  };

  return (
    <div className="container" style={{ zIndex: 100000 }}>
      <i
        className="bi bi-x-lg"
        onClick={(e) => {
          e.stopPropagation();
          setSharingButtonClick(false);
        }}
      ></i>
      <div className="email-info-input">
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
          onClick={() => {
            handleShareSubmit();
            setInput("");
          }}
        >
          결과 공유하기
        </button>
      </div>
    </div>
  );
}

export default EmailInput;
