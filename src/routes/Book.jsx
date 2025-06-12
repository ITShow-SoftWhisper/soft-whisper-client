import React, { useState, useEffect, useRef } from "react";
import CategoryLayout from "../components/CategoryLayout";
import BookImage from "../assets/book.png";
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
  "지금 이 순간에 충실하세요.",
  "예상치 못한 기회가 다가오고 있습니다.",
  "답은 아주 가까이에 있습니다.",
  "스스로에게 정직해지세요.",
  "지금은 멈춰서 돌아볼 시간입니다.",
  "도움을 청하는 것을 두려워하지 마세요.",
  "인내가 곧 열매를 맺습니다.",
  "선택의 순간이 다가오고 있습니다.",
  "감정보다 사실을 우선하세요.",
  "중요한 깨달음을 얻게 될 것입니다.",
  "의외의 사람이 귀인이 됩니다.",
  "지금은 작게 시작해야 할 때입니다.",
  "나무보다 숲을 보세요.",
  "모든 것이 당신 편입니다.",
  "순리에 따르세요.",
  "좋은 소식이 들려올 것입니다.",
  "긍정적인 변화가 시작됩니다.",
  "지금의 고비가 전환점이 됩니다.",
  "때로는 포기가 지혜입니다.",
  "변화를 두려워하지 마세요.",
  "고요함 속에서 해답을 찾으세요.",
  "지금 하는 일이 훗날 큰 영향을 줍니다.",
  "주변을 정리하면 마음도 정돈됩니다.",
  "단순함 속에 진실이 있습니다.",
  "오래된 인연이 다시 연결됩니다.",
  "겉보다 본질을 보세요.",
  "겸손함이 행운을 부릅니다.",
  "너무 앞서가지 마세요.",
  "균형이 중요합니다.",
  "지혜로운 선택이 필요합니다.",
  "당신을 위한 문이 곧 열릴 것입니다.",
  "중요한 만남이 기다리고 있습니다.",
  "계획보다 흐름을 따르세요.",
  "지금은 내려놓을 때입니다.",
  "당신의 용기가 세상을 바꿉니다.",
  "가까운 이에게 힘이 되어주세요.",
  "새롭게 시작할 기회가 주어집니다.",
  "놓친 것이 기회가 될 수 있습니다.",
  "불안보다 호기심을 선택하세요.",
  "감사할 일들이 생깁니다.",
  "과거를 놓아야 미래가 보입니다.",
  "예상 밖의 제안이 들어옵니다.",
  "그동안의 노력이 빛을 발합니다.",
  "지금은 관찰자가 되세요.",
  "믿었던 것과 다를 수 있습니다.",
  "서두르지 말고 천천히 나아가세요.",
  "마음이 향하는 곳이 정답입니다.",
  "변화는 이미 시작되었습니다.",
  "충돌보다 조화를 선택하세요.",
  "더 큰 그림을 그릴 시간입니다.",
];

const totalAnswers = answers.length;
const pagesToRender = totalAnswers * 2; // 총 페이지 수 (왼쪽 + 오른쪽)
const lastPageIndex = pagesToRender - 2; // 마지막 오른쪽 페이지 인덱스 (멈출 조건용)

function BookAnimation({ currentPage, isFlipping, onClick }) {
  return (
    <div className="book-animation-container" onClick={onClick}>
      <div className="book-wrapper">
        {/* 페이지 수만큼 생성 (짝수는 왼쪽, 홀수는 오른쪽) */}
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
