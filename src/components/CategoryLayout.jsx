import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../css/CategoryLayout.css";

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
  imgSrc, // 페이지별 image 경로
  animationComponent, // 페이지별 애니메이션 컴포넌트 (Weather.jsx 참고)
  categoryPhraseText, // 페이지 카테고리별 문구
  categoryButtonText, // 페이지 카테고리별 버튼 문구
  backgroundColor, // 페이지 카테고리별 배경색
  backgroundColor2,
  buttonColor, // 페이지 카테고리별 버튼색
  buttonHoverColor, // // 페이지 카테고리별 버튼 hover색
}) {
  const [buttonIsClick, setButtonIsClick] = useState(false); // 버튼 클릭 여부 (false -> 카테고리별 버든 문구, true -> 홈으로 돌아가기)
  const navigate = useNavigate();

  const handleStartClick = (e) => {
    setButtonIsClick(true);
    e.stopPropagation(); // 상태반전 외에 아무 동작도 실행하지 않음
  };

  const handleShareClick = (e) => {
    e.stopPropagation(); // 결과공유 외에 아무 동작도 실행하지 않음 (추가 코드 필요)
  };

  useEffect(() => {
    if (!buttonIsClick) return; // 운세를 보기 전이면 아무 동작도 실행하지 않고 return

    // Home페이지로 이동
    const handleAnywhereClick = () => {
      navigate("/");
    };

    // 아무곳이나 누르면 handleAnywhereClick함수 호출
    window.addEventListener("click", handleAnywhereClick);

    // 이벤트 중복 호출 방지
    return () => {
      window.removeEventListener("click", handleAnywhereClick);
    };
  }, [buttonIsClick, navigate]);

  return (
    <div className="container" style={{ background: `linear-gradient(320deg, ${backgroundColor}, ${backgroundColor2}` }}>
      <h1 className="phrase-text jua-regular" style={{ color: "#000" }}>
        {categoryPhraseText}
      </h1>
      <div className="animation-content">
        {/* true이면 애니메이션, false이면 이미지만 보여줌 (이미지 움직이는 애니메이션 코드 추가 예정) */}
        {buttonIsClick ? (
          animationComponent
        ) : (
          <img src={imgSrc} className="image" />
        )}
      </div>
      {buttonIsClick ? ( // true이면 결과공유 버튼을 보여줌
        <div className="result-sharing-content">
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
        // false이면 운세보기 버튼을 보여줌
        <div className="start-content">
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
  );
}

export default CategoryLayout;
