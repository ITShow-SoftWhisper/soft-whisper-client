import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../css/CategoryLayout.css";
import EmailInput from "./EmailInput";

// 내가 이 파일 코드 바꿔도 너가 작업하는 페이지에 영향 안감 걱정ㄴㄴ

// hover때문에 결과공튜 버튼 style은 styled-components 씀
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

// 시작 버튼 스타일 컴포넌트
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

// 카테고리별 페이지 레이아웃 컴포넌트
function CategoryLayout({
  category,
  luckyNumbers,
  showFortune,
  imageUrl,
  imgSrc, // 페이지별 image 경로
  animationComponent, // 페이지별 애니메이션 컴포넌트 (Weather.jsx 참고)
  finishFlipped,
  categoryPhraseText, // 페이지 카테고리별 문구
  categoryButtonText, // 페이지 카테고리별 버튼 문구
  backgroundColor, // 페이지 카테고리별 배경색
  backgroundColor2,
  buttonColor, // 페이지 카테고리별 버튼색
  buttonHoverColor, // 페이지 카테고리별 버튼 hover색
  resultShow, // 애니메이션이 끝나면 result-sharing-content을 보여줌
  onCategoryButtonClick = () => {}, // 기본값으로 빈 함수 설정
}) {
  const [buttonIsClick, setButtonIsClick] = useState(false); // 버튼 클릭 여부 상태 (false: 시작 전, true: 시작 후)
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [sharingButtonClick, setSharingButtonClick] = useState(false);
  const [input, setInput] = useState("");

  // 시작 버튼 클릭 시 호출되는 함수
  const handleStartClick = (e) => {
    e.stopPropagation(); // 상태반전 외에 아무 동작도 실행하지 않음
    setButtonIsClick(true); // 버튼 클릭 상태 true로 설정
    onCategoryButtonClick();
  };

  // 결과 공유 버튼 클릭 시 호출되는 함수 (기능 추가 예정)
  const handleShareClick = (e) => {
    e.stopPropagation();
    console.log("handleShareClick");
    setSharingButtonClick(true);
  };

  useEffect(() => {
    if (!buttonIsClick || !resultShow || sharingButtonClick) return; // 운세 보기 전이면 아무 동작도 실행하지 않음

    // 클릭 시 홈으로 이동하는 함수
    const handleAnywhereClick = () => {
      navigate("/"); // 홈으로 이동
    };

    // window에 클릭 이벤트 리스너 등록
    window.addEventListener("click", handleAnywhereClick);

    // cleanup 함수로 이벤트 중복 호출 방지
    return () => {
      window.removeEventListener("click", handleAnywhereClick);
    };
  }, [buttonIsClick, resultShow, navigate, sharingButtonClick]); // 의존성: 버튼 클릭 상태, 결과 표시 여부, navigate

  return (
    <>
      {sharingButtonClick && (
        <EmailInput
          input={input}
          setInput={setInput}
          setSharingButtonClick={setSharingButtonClick}
          resultData={{
            category,
            categoryPhraseText,
            backgroundColor,
            backgroundColor2,
            buttonColor,
            buttonHoverColor,
            luckyNumbers,
            imageUrl,
            showFortune,
          }}
        />
      )}
      <div
        className="container"
        style={{
          background: `linear-gradient(320deg, ${backgroundColor}, ${backgroundColor2}`,
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
        {/* 애니메이션 또는 이미지 보여주는 영역 */}
        <div className="animation-content">
          {/* 버튼을 클릭한 경우 애니메이션 컴포넌트 출력 */}
          {buttonIsClick && <>{animationComponent}</>}

          {/* 버튼 클릭 전이면 이미지 출력 */}
          {!buttonIsClick && !resultShow && (
            <img src={imgSrc} className="image" />
          )}
        </div>

        {/* 버튼 클릭 & 결과 보여줄 준비 완료 시 */}
        {buttonIsClick && resultShow ? (
          <div className={`result-sharing-content ${resultShow && "fade-in2"}`}>
            <ResultSharingButton
              className="result-sharing-button"
              onClick={(e) => {
                console.log(e);
                handleShareClick(e);
              }}
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
          // 버튼 클릭 전, 시작 버튼 보여줌
          <div
            className={`start-content ${buttonIsClick ? "hide-content" : ""}`}
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
