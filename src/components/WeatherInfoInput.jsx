import "../css/WeatherInfoInput.css";

function WeatherInfoInput({ input, setInput, onSubmit, isFadingOut }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={`container ${isFadingOut ? "fade-out" : ""}`}>
      <div className="weather-info-input">
        <input
          className="city-input jua-regular"
          type="text"
          placeholder="도시 이름을 입력하세요 (예 : 서울특별시)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button className="submit-button jua-regular" onClick={onSubmit}>
          운세 보기
        </button>
      </div>
    </div>
  );
}

export default WeatherInfoInput;
