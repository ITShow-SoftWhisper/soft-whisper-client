import React, { useState, useEffect } from "react";
import CategoryLayout from "../components/CategoryLayout";
import ScratchCard from "../components/ScratchCard";
import LuckyImage from "../assets/Lucky/luckycoin.png";
import Coin from "../assets/Lucky/coin.png";
import "../css/LuckyNumber.css";

const backgroundColor = "#ccffbf";
const backgroundColor2 = "#baffa9";
const buttonColor = "#57da4d";
const buttonHoverColor = "#0ece00";

function LuckyNumber() {
  const [categoryPhraseText, setCategoryPhraseText] =
    useState("오늘의 행운숫자 확인하기");
  const [luckyNumbers, setLuckyNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [startScratch, setStartScratch] = useState(false);
  const [useCoinCursor, setUseCoinCursor] = useState(false);

  useEffect(() => {
    document.body.style.cursor = useCoinCursor
      ? `url(${Coin}) 32 32, auto`
      : "auto";
    // cleanup: 언마운트 시 기본으로
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [useCoinCursor]);

  const generateLuckyNumbers = () => {
    const nums = new Set();
    while (nums.size < 6) {
      nums.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(nums).sort((a, b) => a - b);
  };

  const handleCategoryButtonClick = () => {
    setCategoryPhraseText("복권을 긁어주세요!!");
    const numbers = generateLuckyNumbers();
    setLuckyNumbers(numbers);
    setStartScratch(true); // 긁기 애니메이션 시작
    setShowResult(false); // 결과는 아직 보여주지 않음
    setUseCoinCursor(true); // 여기에 코인 커서 켬
  };

  const handleScratchComplete = () => {
    setShowResult(true); // 긁기 완료 후 결과 보여주기
    setCategoryPhraseText("오늘의 복권 당첨 숫자 입니다!");
    setUseCoinCursor(false); // 긁기 완료되면 기본 커서로
  };

  // 행운 숫자 결과 UI
  const LuckyNumberResult = (
    <div className="lucky-number-container">
      <h2 className="jua-regular">당신의 행운의 숫자</h2>
      <div className="lucky-number-list">
        {luckyNumbers.map((num, index) => (
          <div key={index} className="lucky-number-ball">
            {num}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <CategoryLayout
      category="lucky"
      luckyNumbers={luckyNumbers}
      showFortune=""
      bookFortune=""
      imgSrc={LuckyImage}
      categoryPhraseText={categoryPhraseText}
      categoryButtonText="복권긁기"
      backgroundColor={backgroundColor}
      backgroundColor2={backgroundColor2}
      buttonColor={buttonColor}
      buttonHoverColor={buttonHoverColor}
      onCategoryButtonClick={handleCategoryButtonClick}
      animationComponent={
        startScratch ? (
          // 긁기 시작 후 ScratchCard 렌더링
          <ScratchCard
            onScratchComplete={handleScratchComplete}
            coinCursor={useCoinCursor}
            coinImage={Coin}
          >
            {LuckyNumberResult}
          </ScratchCard>
        ) : null
      }
      resultShow={showResult}
    />
  );
}

export default LuckyNumber;
