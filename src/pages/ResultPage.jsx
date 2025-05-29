import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import FortuneOpenImage from "../assets/fortune/fortuneopen.png";

import "../css/ResultPage.css";

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
    categoryPhraseText,
    backgroundColor,
    backgroundColor2,
    buttonColor,
    buttonHoverColor,
    // animationComponent,
  } = result;

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
      {/* <h1>🔮 공유된 결과</h1>
      <pre>{JSON.stringify(result, null, 2)}</pre> */}
      <h1 className="phrase-text jua-regular" style={{ color: "#000" }}>
        {categoryPhraseText}
      </h1>
      <div className="animation-content">
        <img className="test-image" src={FortuneOpenImage} />
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
