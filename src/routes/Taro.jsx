import { useEffect, useState } from "react";
import CategoryLayout from "@/components/CategoryLayout";
import TaroImage from "@/assets/taro/taro.png";
import TaroFortuneMessages from "@/components/TaroFortuneMessages";

import TaroBack from "@/assets/taro/taro-card/taro_back.png";

import "@/css/TaroCard.scss";

function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function TaroAnimation({
  setResultShow,
  setCategoryPhraseText,
  finishFlipped,
  setFinishFlipped,
  setImageUrl,
  showFortune,
  setShowFortune,
}) {
  const [flipped, setFlipped] = useState(Array(22).fill(false));
  const [cardClasses, setCardClasses] = useState(Array(22).fill("card"));
  const [selectedCard, setSelectedCard] = useState(Array(22).fill(false));
  const [isDisable, setIsDisable] = useState(true);
  const [oneCardClick, setOneCardClick] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [shuffledCards] = useState(() => shuffleArray(TaroFortuneMessages));

  useEffect(() => {
    shuffledCards.forEach((_, i) => {
      setTimeout(() => {
        setCardClasses((prev) => {
          const updated = [...prev];
          updated[i] = `card ani${i}`;
          return updated;
        });
        if (i === shuffledCards.length - 1) {
          setCategoryPhraseText("카드를 고르세요!");
          setIsDisable(false);
        }
      }, 4000);
    });
  }, [setCategoryPhraseText, shuffledCards]);

  const handleCardClick = (i) => {
    if (isDisable || oneCardClick) return;

    setIsClicked(true);
    setIsDisable(true);
    setOneCardClick(true);

    setSelectedCard((prev) => {
      const updated = [...prev];
      updated[i] = true;
      return updated;
    });

    setTimeout(() => {
      setFlipped((prev) => {
        const updated = [...prev];
        updated[i] = true;
        return updated;
      });

      setFinishFlipped(true);
      setCategoryPhraseText(shuffledCards[i].text);
      let imagePath = shuffledCards[i].src;
      setImageUrl(imagePath);

      const fortunes = shuffledCards[i].fortunes;
      const randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];

      setShowFortune(randomFortune);

      setTimeout(() => {
        setResultShow(true);
      }, 1700);
    }, 1500);
  };

  return (
    <div className="taro-animation-container">
      <div className="card-list">
        {shuffledCards.map((card, i) => (
          <div
            key={i}
            className={`
              ${cardClasses[i]}
              card-num${i}
              ${flipped[i] ? "flipped" : ""}
              ${isDisable ? "" : "enable-hover"}
              ${selectedCard[i] ? `selected-card selected-card${i}` : ""}
              ${isClicked ? "click-card" : ""}
            `}
            onClick={() => handleCardClick(i)}
          >
            <div className="card-inner">
              <img className="card-front" src={card.src} />
              <img className="card-back" src={TaroBack} />
            </div>
          </div>
        ))}
      </div>
      {finishFlipped && (
        <p
          className="jua-regular fortune-message"
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            width: "30%",
            height: "40%",
            fontSize: "130%",
            lineHeight: "1.5",
            padding: "0",
            marginLeft: "25%",
          }}
        >
          {showFortune}
        </p>
      )}
    </div>
  );
}

const backgroundColor = "#E4CFFF";
const backgroundColor2 = "#C79CFF";
const buttonColor = "#D468FF";
const buttonHoverColor = "#c039f5";

function Taro() {
  const [resultShow, setResultShow] = useState(false);
  const [categoryPhraseText, setCategoryPhraseText] =
    useState("오늘의 타로 확인하기");
  const [finishFlipped, setFinishFlipped] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showFortune, setShowFortune] = useState("");

  return (
    <CategoryLayout
      category="taro"
      showFortune={showFortune}
      imageUrl={imageUrl}
      imgSrc={TaroImage}
      animationComponent={
        <TaroAnimation
          setResultShow={setResultShow}
          setCategoryPhraseText={setCategoryPhraseText}
          finishFlipped={finishFlipped}
          setFinishFlipped={setFinishFlipped}
          setImageUrl={setImageUrl}
          showFortune={showFortune}
          setShowFortune={setShowFortune}
        />
      }
      finishFlipped={finishFlipped}
      categoryPhraseText={categoryPhraseText}
      categoryButtonText="타로 보기"
      backgroundColor={backgroundColor}
      backgroundColor2={backgroundColor2}
      buttonColor={buttonColor}
      buttonHoverColor={buttonHoverColor}
      resultShow={resultShow}
    />
  );
}

export default Taro;
