import React, { useState } from "react";
import CategoryLayout from "../components/CategoryLayout";
import CategorySelector from "../components/CategorySelector";
import fortuneMessages from "../components/fortuneMessages";
import FortuneImage from "../assets/fortune/fortune.png";
import FortuneOpenImage from "../assets/fortune/fortuneopen.png";
import FortuneOpenLeft from "../assets/fortune/fortuneopen_left.png";
import FortuneOpenRight from "../assets/fortune/fortuneopen_right.png";
import "../css/CategorySelector.css";

const backgroundColor = "#FFFBDB";
const backgroundColor2 = "#FFF6B2";
const buttonColor = "#ffd744";
const buttonHoverColor = "#ffc800";

function FortuneCookie() {
  const [step, setStep] = useState("start"); // 상태: start → select → result
  const [category, setCategory] = useState(null);
  const [categoryPhraseText, setCategoryPhraseText] =
    useState("오늘의 포춘쿠키 확인하기");

  const handleStart = () => {
    setStep("select");
    setCategory(null); // 이전 카테고리 초기화
    setCategoryPhraseText("원하는 카테고리를 골라주세요!");
  };

  const handleCategorySelect = (selectedCategory) => {
    const messages = fortuneMessages[selectedCategory];
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];

    setCategory(selectedCategory);
    setCategoryPhraseText(message);
    setStep("result");
  };

  const displayedImage = category !== null ? FortuneOpenImage : FortuneImage;

  const SelectedComponent =
    step === "select" ? (
      <CategorySelector onSelect={handleCategorySelect} />
    ) : (
      <div className="fortune-crack-container">
        <img src={FortuneOpenLeft} className="fortune-half left-half" />
        <img src={FortuneOpenRight} className="fortune-half right-half" />
      </div>
    );

  return (
    <CategoryLayout
      category="fortune"
      showFortune={categoryPhraseText}
      bookFortune=""
      imgSrc={displayedImage}
      animationComponent={SelectedComponent}
      categoryPhraseText={categoryPhraseText}
      categoryButtonText="쿠키 굽기"
      onCategoryButtonClick={handleStart}
      resultShow={step === "result"}
      backgroundColor={backgroundColor}
      backgroundColor2={backgroundColor2}
      buttonColor={buttonColor}
      buttonHoverColor={buttonHoverColor}
    />
  );
}

export default FortuneCookie;