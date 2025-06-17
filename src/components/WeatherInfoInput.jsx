import "../css/WeatherInfoInput.css";

function WeatherInfoInput({
  input,
  setInput,
  onSubmit,
  isFadingOut,
  setInputCancel,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={`container ${isFadingOut ? "fade-out" : ""}`}>
      <i
        className="bi bi-x-lg"
        onClick={(e) => {
          e.stopPropagation();
          setInputCancel(true);
        }}
      ></i>
      <div className="weather-info-input">
        <input
          className="city-input jua-regular"
          type="text"
          placeholder="지역 이름을 입력하세요 (예 : 서울특별시, 관악구, 신림동)"
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
