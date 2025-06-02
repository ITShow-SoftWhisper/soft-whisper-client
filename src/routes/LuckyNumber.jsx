import React, { useState } from "react";
import CategoryLayout from "../components/CategoryLayout";
import LuckyImage from "../assets/Lucky/luckycoin.png";
import ScratchCard from "../components/ScratchCard";
import "../css/LuckyNumber.css";

const backgroundColor = "#E0FFD8";
const backgroundColor2 = "#B7FFA5";
const buttonColor = "#78e670";
const buttonHoverColor = "#4bd841";

function LuckyNumber() {
  const [categoryPhraseText, setCategoryPhraseText] = useState("오늘의 행운숫자 확인하기");
  const [luckyNumbers, setLuckyNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [startScratch, setStartScratch] = useState(false);

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
    setStartScratch(true); // 긁기 시작하도록 설정
    setShowResult(false);  // 결과는 나중에 보여줘야 함!
  };

  const handleScratchComplete = () => {
    setShowResult(true); // 긁기 완료 후에 결과 보여주기
  };

  const LuckyNumberResult = (
    <div className="lucky-number-container">
      <h2 className="jua-regular">✨ 당신의 행운의 숫자 ✨</h2>
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
          <ScratchCard onScratchComplete={handleScratchComplete}>
            {LuckyNumberResult}
          </ScratchCard>
        ) : null
      }
      resultShow={showResult}
    />
  );
}

export default LuckyNumber;
