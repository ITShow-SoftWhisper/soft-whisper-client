import React, { useState } from "react";
import CategoryLayout from "../components/CategoryLayout";
import FortuneImage from "../assets/fortune/fortune.png";
import FortuneOpenImage from "../assets/fortune/fortuneopen.png";
import fortuneMessages from "../components/fortuneMessages";
import "../css/CategorySelector.css";
import CategorySelector from "../components/CategorySelector";

const backgroundColor = "#FFFBDB";
const backgroundColor2 = "#FFF6B2";
const buttonColor = "#FFC037";
const buttonHoverColor = "#e5962e";

function FortuneCookie() {
  const [step, setStep] = useState("start"); // start → select → result
  const [category, setCategory] = useState(null);
  const [categoryPhraseText, setCategoryPhraseText] =
    useState("오늘의 포춘쿠키 확인하기");

  const handleStart = () => {
    setStep("select");
    setCategory(null); // 이미지 초기화
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

  // ✅ category가 선택되었으면 열린 쿠키 이미지 보여주기
  const displayedImage = category !== null ? FortuneOpenImage : FortuneImage;

  const SelectedComponent =
    step === "select" ? (
      <CategorySelector onSelect={handleCategorySelect} />
    ) : (
      <img src={FortuneOpenImage} className="fortune-open" />
    );

  return (
    <CategoryLayout
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
