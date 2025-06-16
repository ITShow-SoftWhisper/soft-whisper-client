import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FortuneOpenLeft from "../assets/fortune/fortuneopen_left.png";
import FortuneOpenRight from "../assets/fortune/fortuneopen_right.png";
import TaroFortuneMessages from "../components/TaroFortuneMessages";

import "../css/ResultPage.css";

function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL ||
      (import.meta.env.MODE === "development"
        ? "http://localhost:3001"
        : "http://ec2-43-201-95-227.ap-northeast-2.compute.amazonaws.com:3001");
    fetch(`${API_BASE_URL}/api/result/${id}`)
      .then((res) => res.json())
      .then((data) => setResult(data))
      .catch((err) => console.error("결과 불러오기 실패:", err));
  }, [id]);

  if (!result) return <p>결과 불러오는 중...</p>;

  const {
    category,
    categoryPhraseText,
    backgroundColor,
    backgroundColor2,
    buttonColor,
    buttonHoverColor,
    luckyNumbers,
    showFortune,
    fortune,
    weatherImageUrl,
    bookFortune,
  } = result;

  let categoryAnimationContent = null;

  console.log("weatherImageUrl : ", weatherImageUrl);
  console.log("fortune : ", fortune);
  console.log("문장 : ", bookFortune);

  if (category === "book") {
    categoryAnimationContent = (
      <div className="book-content">
        <div className="book-cover book-cover-left" />
        <div className="book-cover book-cover-right" />
        <div className="book-page-content">
          <div className="book-page" />
          <div className="book-page">
            <p className="book-fortune">{bookFortune}</p>
          </div>
        </div>
      </div>
    );
  } else if (category === "fortune") {
    categoryAnimationContent = (
      <div className="fortune-content">
        <img src={FortuneOpenLeft} className="fortune-half left-half" />
        <img src={FortuneOpenRight} className="fortune-half right-half" />
      </div>
    );
  } else if (category === "lucky") {
    categoryAnimationContent = (
      <div className="card-content">
        <div className="number-container">
          <h2 className="card-text jua-regular">당신의 행운의 숫자</h2>
          <div className="lucky-number-list">
            {luckyNumbers.map((num, index) => (
              <div key={index} className="lucky-number-ball">
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (category === "taro") {
    const selectedCard = TaroFortuneMessages.find(
      (card) => card.text.toLowerCase() === categoryPhraseText.toLowerCase()
    );
    categoryAnimationContent = (
      <div className="taro-content">
        {selectedCard && (
          <div>
            <img src={selectedCard.src} className="taro-image" />
          </div>
        )}
        <div className="taro-fortune">
          <p className="taro-fortune-text jua-regular">{showFortune}</p>
        </div>
      </div>
    );
  } else if (category === "weather") {
    categoryAnimationContent = (
      <div className="weather-content">
        <div className="weather-image-content">
          <img src={weatherImageUrl} className="weather-image" />
        </div>
        <p className="weather-fortune jua-regular">{fortune}</p>
      </div>
    );
  }

  const Button = styled.button`
    border: none;
    outline: none;
    border-radius: 2px;
    background-color: ${buttonColor};
    transition: background-color 0.3s;

    &:hover {
      background-color: ${buttonHoverColor};
      cursor: pointer;
    }
  `;

  return (
    <div
      className={`
        container
        ${
          category === "taro"
            ? "taro-container"
            : category === "weather"
            ? "weather-container"
            : ""
        }
      `}
      style={{
        background: `linear-gradient(320deg, ${backgroundColor}, ${backgroundColor2}`,
      }}
    >
      <h1
        className={`
          phrase-text 
          ${category === "taro" ? "dm-serif-display-regular" : "jua-regular"}`}
        style={{ color: "#000" }}
      >
        {categoryPhraseText}
      </h1>
      <div
        className={`
          animation-content 
          ${
            category === "taro"
              ? "taro-animation-content"
              : category === "weather"
              ? "weather-animation-content"
              : ""
          }
        `}
      >
        {categoryAnimationContent}
      </div>
      <div className="other-fortune-button-content">
        <Link to="/" className="re-start-button">
          <Button className="other-fortune-button">
            <p className="jua-regular" style={{ color: "#fff" }}>
              다른 운세도 보러가기
            </p>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ResultPage;
