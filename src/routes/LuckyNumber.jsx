import React, { useState } from "react";
import CategoryLayout from "../components/CategoryLayout";
import LuckyImage from "../assets/Lucky/luckycoin.png";
import ScratchCard from "../components/ScratchCard";
import "../css/LuckyNumber.css";

const backgroundColor = "#E0FFD8";
const backgroundColor2 = "#B7FFA5";
const buttonColor = "#57da4d";
const buttonHoverColor = "#0ece00";

function LuckyNumber() {
  const [categoryPhraseText, setCategoryPhraseText] =
    useState("오늘의 행운숫자 확인하기");
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
    setStartScratch(true); // 긁기 애니메이션 시작
    setShowResult(false); // 결과는 아직 보여주지 않음
  };

  const handleScratchComplete = () => {
    setShowResult(true); // 긁기 완료 후 결과 보여주기
    setCategoryPhraseText("오늘의 복권 당첨 숫자 입니다!");
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
