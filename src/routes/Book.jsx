import React, { useState, useEffect, useRef } from "react";
import CategoryLayout from "../components/CategoryLayout";
import BookImage from "../assets/book.png";
import "../css/Book.css";
import answers from "../components/BookAnswer";

const totalAnswers = answers.length;
const pagesToRender = totalAnswers * 2; // 총 페이지 수 (왼쪽 + 오른쪽)
const lastPageIndex = pagesToRender - 2; // 마지막 오른쪽 페이지 인덱스 (멈출 조건용)

function BookAnimation({ currentPage, isFlipping, onClick }) {
  return (
    <div className="book-animation-container" onClick={onClick}>
      <div className="book-wrapper">
        {/* 페이지 수만큼 생성 (짝수는 왼쪽, 홀수는 오른쪽) */}
        <div className="book-back-shadow shadow-left" />
        <div className="book-back-shadow shadow-right" />
        {Array.from({ length: pagesToRender }).map((_, i) => {
          const isLeft = i % 2 === 0;
          const flipped = i <= currentPage;
          const isActive = !isFlipping && i === currentPage;

          return (
            <div
              key={i}
              className={[
                "page",
                isLeft ? "page-left" : "page-right",
                flipped && "flipped-page",
                isActive && "active-page",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ zIndex: pagesToRender - i }}
            >
              <div className="page-content">
                {/* 오른쪽 페이지에만 문장 표시(i가 홀수일때만) */}
                {!isLeft && i > 0 ? answers[Math.floor((i - 1) / 2)] : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Book() {
  const [currentPage, setCurrentPage] = useState(-1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [categoryPhraseText, setCategoryPhraseText] =
    useState("오늘의 책 운세 확인하기");
  const [resultShow, setResultShow] = useState(false);
  const intervalRef = useRef(null);
  const [bookFortune, setBookFortune] = useState("");

  useEffect(() => {
    if (isFlipping) {
      // 일정 간격으로 페이지 넘기기
      intervalRef.current = setInterval(() => {
        setCurrentPage((prev) => {
          if (prev + 1 > lastPageIndex) {
            // 마지막 페이지 도달 시 멈춤
            clearInterval(intervalRef.current);
            setIsFlipping(false);
            setResultShow(true);
            setCategoryPhraseText("오늘 나는?");
            return prev;
          }
          return prev + 1;
        });
      }, 60); // 넘기는 속도(ms)
    }
    // cleanup
    return () => clearInterval(intervalRef.current);
  }, [isFlipping]);

  const handleCategoryButtonClick = () => {
    setCategoryPhraseText("책을 클릭해 멈춰주세요!");
    setIsFlipping(true);
    setCurrentPage(-1);
    setResultShow(false);
  };

  const handleStopFlipping = (e) => {
    e.stopPropagation();
    if (isFlipping) {
      clearInterval(intervalRef.current);
      setIsFlipping(false);
      setResultShow(true);
      setCategoryPhraseText("오늘 나는?");
      setBookFortune(answers[Math.floor((currentPage - 1) / 2)]);
    }
  };

  return (
    <CategoryLayout
      category="book"
      imgSrc={BookImage}
      bookFortune={bookFortune}
      animationComponent={
        <div style={{ display: "flex", justifyContent: "center" }}>
          <BookAnimation
            currentPage={currentPage}
            isFlipping={isFlipping}
            onClick={handleStopFlipping}
          />
        </div>
      }
      categoryPhraseText={categoryPhraseText}
      categoryButtonText="책 펼치기"
      backgroundColor="#CFE0FF"
      backgroundColor2="#ABC9FF"
      buttonColor="#5C95FF"
      buttonHoverColor="#2772ff"
      resultShow={resultShow}
      onCategoryButtonClick={handleCategoryButtonClick}
    />
  );
}
