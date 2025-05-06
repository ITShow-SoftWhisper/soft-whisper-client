import CategoryLayout from "../components/CategoryLayout"
import LuckyImage from "../assets/lucky.png"
import React, {useState} from "react"

function LuckyAnimation({setCategoryPhraseText}){
  const resetState = () => {
    setCategoryPhraseText("오늘의 행운복권 확인하기")
  }
}

const backgroundColor = "#E0FFD8";
const backgroundColor2 = "#B7FFA5";
const buttonColor = "#72DA64";
const buttonHoverColor = "#94ED89";

function LuckyNumber() {
  const [categoryPhraseText, setCategoryPhraseText] =
      useState("오늘의 행운복권 확인하기");
  
  return (
    <CategoryLayout
    imgSrc={LuckyImage}
    animationComponent={
      <LuckyAnimation
        setCategoryPhraseText={setCategoryPhraseText}
      />
    }
    categoryPhraseText={categoryPhraseText}
    categoryButtonText="동전 긁기"
    backgroundColor={backgroundColor}
    backgroundColor2={backgroundColor2}
    buttonColor={buttonColor}
    buttonHoverColor={buttonHoverColor}
    />
  )
}

export default LuckyNumber;
