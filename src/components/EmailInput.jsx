import "../css/EmailInput.css";

function EmailInput({ input, setInput }) {
  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter") {
  //       onSubmit();
  //     }
  //   };

  return (
    <div className="container" style={{ zIndex: 100000 }}>
      <div className="email-info-input">
        <input
          className="email-input jua-regular"
          type="email"
          placeholder="이메일을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          //   onKeyDown={handleKeyDown}
          autoFocus
        />
        <button className="email-send-button jua-regular">결과 공유하기</button>
      </div>
    </div>
  );
}

export default EmailInput;
