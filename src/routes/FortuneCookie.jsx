import CategoryLayout from "../components/CategoryLayout"
import FortuneImage from "../assets/fortune.png"
import React, {useState} from "react"

function FortuneCookieAnimation({setCategoryPhraseText}){
  const resetState = () => {
    setCategoryPhraseText("오늘의 포춘쿠키 확인하기")
  }
}

const backgroundColor = "#FFFBDB";
const backgroundColor2 = "#FFF6B2";
const buttonColor = "#FFC037";
const buttonHoverColor = "#FFDD94";

function FortuneCookie() {
  const [categoryPhraseText, setCategoryPhraseText] =
      useState("오늘의 포춘쿠키 확인하기");
  
  return (
    <CategoryLayout
    imgSrc={FortuneImage}
    animationComponent={
      <FortuneCookieAnimation
        setCategoryPhraseText={setCategoryPhraseText}
      />
    }
    categoryPhraseText={categoryPhraseText}
    categoryButtonText="쿠키 굽기"
    backgroundColor={backgroundColor}
    backgroundColor2={backgroundColor2}
    buttonColor={buttonColor}
    buttonHoverColor={buttonHoverColor}
    />
  )
}

export default FortuneCookie;
