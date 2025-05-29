import "../css/EmailInput.css";

function EmailInput({ input, setInput, setSharingButtonClick, resultData }) {
  const handleShareSubmit = async () => {
    setInput("");
    try {
      const res = await fetch("http://localhost:3000/api/share", {
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
        console.error("❌ JSON 파싱 실패", e);
        return;
      }

      if (res.ok) {
        alert("당신의 행운배달이 완료되었어요!");
      } else {
        alert("행운배달에 실패했어요...");
      }
    } catch (e) {
      console.error("💥 네트워크 오류:", e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleShareSubmit();
    }
  };

  return (
    <div className="container" style={{ zIndex: 100000 }}>
      <i
        class="bi bi-x-lg"
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
