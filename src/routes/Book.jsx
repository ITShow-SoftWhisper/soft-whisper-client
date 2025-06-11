// Book.jsx
import CategoryLayout from "../components/CategoryLayout";
import BookImage from "../assets/book.png";
import React, { useState, useEffect, useRef } from "react";
import "../css/Book.css";

const answers = [
  "지금은 때가 아닙니다.",
  "계속 밀고 나가세요.",
  "기다려 보세요.",
  "조심스럽게 접근하세요.",
  "확신이 서면 행동하세요.",
  "그만두는 것이 최선입니다.",
  "놀라운 결과를 기대하세요.",
  "지금은 쉬어야 할 때입니다.",
  "다시 한 번 확인해 보세요.",
  "가까운 사람의 조언을 구하세요.",
  "너무 복잡하게 생각하지 마세요.",
  "예기치 않은 도움이 찾아옵니다.",
  "혼자 결정하지 마세요.",
  "계획을 바꿔보세요.",
  "이미 답은 알고 있습니다.",
  "믿음을 가져야 합니다.",
  "유연하게 대처하세요.",
  "지금은 모험할 때입니다.",
  "감정에 휘둘리지 마세요.",
  "신중히 관찰하세요.",
  "기회는 다시 옵니다.",
  "시간이 해결해 줄 것입니다.",
  "내면의 소리에 귀 기울이세요.",
  "예상보다 빨리 이루어질 것입니다.",
  "명확한 목표가 필요합니다.",
  "당신의 진심이 통할 것입니다.",
  "이건 시작에 불과합니다.",
  "다시 생각해 보세요.",
  "다른 방향을 고려하세요.",
  "지금은 기다릴 때입니다.",
  "예스!",
  "노(No)!",
  "당장은 아니지만 곧 그렇게 될 것입니다.",
  "걱정할 필요 없습니다.",
  "누구보다 당신이 잘 압니다.",
  "더 나은 기회가 옵니다.",
  "생각보다 간단합니다.",
  "작은 변화가 큰 차이를 만듭니다.",
  "진심으로 원한다면 가능할 것입니다.",
  "큰 결단이 필요합니다.",
  "그 일은 오래가지 않을 것입니다.",
  "스스로를 믿으세요.",
  "과거에서 배워야 합니다.",
  "예기치 못한 반전이 있습니다.",
  "이건 당신의 길이 아닙니다.",
  "곧 명확해질 것입니다.",
  "계속 의심하지 마세요.",
  "모든 것이 제자리를 찾을 것입니다.",
  "먼저 용서를 구하세요.",
  "모든 것은 이유가 있습니다.",
];

function BookAnimation({ currentPage, isFlipping, onClick }) {
  const totalPages = 50;
  // 렌더링할 총 페이지 수
  const pagesToRender = totalPages * 2;

  return (
    <div className="book-animation-container" onClick={onClick}>
      <div className="book-wrapper">
        {[...Array(pagesToRender)].map((_, i) => {
          const isLeft = i % 2 === 0;
          // i번째 페이지가 플립된 상태인지
          const flipped = i <= currentPage;
          // 명언 보여줄 활성 페이지 판단
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
  const totalPages = 100; // 앞뒤 합쳐 100장
  const [currentPage, setCurrentPage] = useState(-1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [categoryPhraseText, setCategoryPhraseText] =
    useState("오늘의 책 운세 확인하기");
  const [resultShow, setResultShow] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isFlipping) {
      intervalRef.current = setInterval(() => {
        setCurrentPage((prev) => {
          // totalPages는 “앞뒤 합쳐 총 페이지 수”(여기선 100)
          // 마지막으로 실제 뒤집힐 인덱스 = totalPages - 2 (즉 98)
          const lastIndex = totalPages - 2;
          if (prev + 1 > lastIndex) {
            clearInterval(intervalRef.current);
            setIsFlipping(false);
            setResultShow(true);
            setCategoryPhraseText("오늘 나는?");
            return prev;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(intervalRef.current);
  }, [isFlipping, currentPage]);

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
    }
  };

  return (
    <CategoryLayout
      category="book"
      imgSrc={BookImage}
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
