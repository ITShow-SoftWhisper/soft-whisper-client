import CategoryLayout from "../components/CategoryLayout"
import BookImage from "../assets/book.png"
import React, {useState} from "react"

function BookAnimation({setCategoryPhraseText}){
  const resetState = () => {
    setCategoryPhraseText("오늘의 책 운세 확인하기")
  }
}

const backgroundColor = "#CFE0FF";
const backgroundColor2 = "#ABC9FF";
const buttonColor = "#5C95FF";
const buttonHoverColor = "#96BBFF";

function Book() {
  const [categoryPhraseText, setCategoryPhraseText] =
      useState("오늘의 책 운세 확인하기");
  
  return (
    <CategoryLayout
    imgSrc={BookImage}
    animationComponent={
      <BookAnimation
        setCategoryPhraseText={setCategoryPhraseText}
      />
    }
    categoryPhraseText={categoryPhraseText}
    categoryButtonText="책 펼치기"
    backgroundColor={backgroundColor}
    backgroundColor2={backgroundColor2}
    buttonColor={buttonColor}
    buttonHoverColor={buttonHoverColor}
    />
  )
}

export default Book;
