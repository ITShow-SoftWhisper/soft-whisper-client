import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../css/CategoryLayout.css";
import EmailInput from "./EmailInput";

const ResultSharingButton = styled.button`
  border: none;
  outline: none;
  border-radius: 2px;
  background-color: ${(props) => props.buttonColor};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.hoverColor};
    cursor: pointer;
  }
`;

const StartButton = styled.button`
  border: 2px solid ${(props) => props.buttonColor};
  border-radius: 50px;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
  p {
    font-family: "Jua", sans-serif;
    color: ${(props) => props.buttonColor};
    transition: color 0.3s ease;
  }
  &:hover {
    border-color: ${(props) => props.hoverColor};
  }
  &:hover p {
    color: ${(props) => props.hoverColor};
  }
`;

function CategoryLayout({
  category,
  weatherImageUrl,
  fortune,
  luckyNumbers,
  showFortune,
  bookFortune,
  imgSrc,
  animationComponent,
  inputComponent,
  showInput,
  finishFlipped,
  categoryPhraseText,
  categoryButtonText,
  backgroundColor,
  backgroundColor2,
  buttonColor,
  buttonHoverColor,
  resultShow,
  onCategoryButtonClick = () => {},
  inputCancel,
  setInputCancel,
}) {
  const [buttonIsClick, setButtonIsClick] = useState(false);
  const navigate = useNavigate();
  const [sharingButtonClick, setSharingButtonClick] = useState(false);
  const [input, setInput] = useState("");

  const handleStartClick = (e) => {
    e.stopPropagation();
    setButtonIsClick(true);
    onCategoryButtonClick();
    setInputCancel(false);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    setSharingButtonClick(true);
  };

  useEffect(() => {
    if (!buttonIsClick || !resultShow || sharingButtonClick) return;
    const handleAnywhereClick = () => navigate("/");
    window.addEventListener("click", handleAnywhereClick);
    return () => window.removeEventListener("click", handleAnywhereClick);
  }, [buttonIsClick, resultShow, navigate, sharingButtonClick]);

  return (
    <>
      {sharingButtonClick && (
        <EmailInput
          input={input}
          setInput={setInput}
          setSharingButtonClick={setSharingButtonClick}
          resultData={{
            category,
            weatherImageUrl,
            fortune,
            luckyNumbers,
            showFortune,
            bookFortune,
            categoryPhraseText,
            backgroundColor,
            backgroundColor2,
            buttonColor,
            buttonHoverColor,
          }}
        />
      )}
      <div
        className="container"
        style={{
          background: `linear-gradient(320deg, ${backgroundColor}, ${backgroundColor2})`,
        }}
      >
        <h1
          className={`phrase-text ${
            finishFlipped ? "dm-serif-display-regular" : "jua-regular"
          }`}
          style={{ color: "#000" }}
        >
          {categoryPhraseText}
        </h1>

        <div className="animation-content">
          {buttonIsClick && showInput && !inputCancel && inputComponent}

          {buttonIsClick && !showInput && animationComponent}

          {!resultShow && (!buttonIsClick || showInput) && (
            <img src={imgSrc} className="image" />
          )}
        </div>

        {buttonIsClick && resultShow ? (
          <div className={`result-sharing-content ${resultShow && "fade-in2"}`}>
            <ResultSharingButton
              className="result-sharing-button"
              onClick={handleShareClick}
              buttonColor={buttonColor}
              hoverColor={buttonHoverColor}
            >
              <p className="jua-regular" style={{ color: "#fff" }}>
                이메일로 결과 공유하기
              </p>
            </ResultSharingButton>
            <p className="back-home">아무곳이나 클릭하여 홈으로 돌아가기</p>
          </div>
        ) : (
          <div
            className={`start-content ${
              buttonIsClick && !showInput ? "hide-content" : ""
            }`}
          >
            <StartButton
              className="start-button"
              buttonColor={buttonColor}
              hoverColor={buttonHoverColor}
              onClick={handleStartClick}
            >
              <p className="jua-regular">{categoryButtonText}</p>
            </StartButton>
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryLayout;
