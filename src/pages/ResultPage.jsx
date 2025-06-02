import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FortuneOpenImage from "../assets/fortune/fortuneopen.png";

import "../css/ResultPage.css";
import CategoryLayout from "./../components/CategoryLayout";

function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`/api/result/${id}`)
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
    imageUrl,
    showFortune,
  } = result;

  let categoryAnimationContent = null;

  console.log("imageUrl : ", imageUrl);

  if (category === "book") {
    categoryAnimationContent = <div></div>;
  } else if (category === "fortune") {
    categoryAnimationContent = (
      <img src={FortuneOpenImage} className="fortune-open" />
    );
  } else if (category === "lucky") {
    categoryAnimationContent = (
      <div className="card-content">
        <div className="number-container">
          <h2 className="jua-regular">✨ 당신의 행운의 숫자 ✨</h2>
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
    categoryAnimationContent = (
      <div className="taro-content">
        <div>
          <img src={imageUrl} className="taro-image" />
        </div>
        <div className="taro-fortune">
          <p className="jua-regular">{showFortune}</p>
        </div>
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
      className="container"
      style={{
        background: `linear-gradient(320deg, ${backgroundColor}, ${backgroundColor2}`,
      }}
    >
      <h1
        className={`phrase-text ${
          category === "taro" ? "dm-serif-display-regular" : "jua-regular"
        }`}
        style={{ color: "#000" }}
      >
        {categoryPhraseText}
      </h1>
      <div className="animation-content">{categoryAnimationContent}</div>
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
