import "../css/EmailInput.css";

function EmailInput({ input, setInput }) {
  const handleShareSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input,
          result: { message: "테스트 결과입니다" },
        }),
      });

      const text = await res.text(); // ⚠️ text로 먼저 확인
      console.log("🔎 서버 응답 원문:", text);

      let data;
      try {
        data = JSON.parse(text); // 응답을 수동으로 JSON 파싱 시도
      } catch (e) {
        console.error("❌ JSON 파싱 실패", e);
        return;
      }

      if (res.ok) {
        alert(`링크가 생성되었습니다: ${data.shareUrl}`);
      } else {
        alert("공유에 실패했습니다");
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
          onClick={handleShareSubmit}
        >
          결과 공유하기
        </button>
      </div>
    </div>
  );
}

export default EmailInput;
