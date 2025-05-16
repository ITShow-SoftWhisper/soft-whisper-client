import { useEffect, useState } from "react";
import CategoryLayout from "../components/CategoryLayout";
import TaroImage from "../assets/taro/taro.png";

import TaroBack from "../assets/taro/taro-card/taro_back.png";
import death from "../assets/taro/taro-card/Death.png";
import judgement from "../assets/taro/taro-card/Judgement.png";
import justice from "../assets/taro/taro-card/Justice.png";
import strength from "../assets/taro/taro-card/Strength.jpg";
import temperance from "../assets/taro/taro-card/Temperance.png";
import theChariot from "../assets/taro/taro-card/The_Chariot.png";
import theDevil from "../assets/taro/taro-card/The_Devil.png";
import theEmperor from "../assets/taro/taro-card/The_Emperor.png";
import theEmpress from "../assets/taro/taro-card/The_Empress.png";
import theFool from "../assets/taro/taro-card/The_Fool.png";
import theHangedMan from "../assets/taro/taro-card/The_Hanged_Man.png";
import theHermit from "../assets/taro/taro-card/The_Hermit.png";
import theHierophant from "../assets/taro/taro-card/The_Hierophant.png";
import theHighPriestess from "../assets/taro/taro-card/The_High_Priestess.png";
import theLovers from "../assets/taro/taro-card/The_Lovers.png";
import theMagician from "../assets/taro/taro-card/The_Magician.png";
import theMoon from "../assets/taro/taro-card/The_Moon.png";
import theStar from "../assets/taro/taro-card/The_Star.png";
import theSun from "../assets/taro/taro-card/The_Sun.png";
import theTower from "../assets/taro/taro-card/The_Tower.png";
import theWorld from "../assets/taro/taro-card/The_World.png";
import wheelOfFortune from "../assets/taro/taro-card/Wheel_Of_Fortune.png";

import "../css/TaroCard.css";

const cardImages = [
  death,
  judgement,
  justice,
  strength,
  temperance,
  theChariot,
  theDevil,
  theEmperor,
  theEmpress,
  theFool,
  theHangedMan,
  theHermit,
  theHierophant,
  theHighPriestess,
  theLovers,
  theMagician,
  theMoon,
  theStar,
  theSun,
  theTower,
  theWorld,
  wheelOfFortune,
];

function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function TaroAnimation({ setResultShow, setCategoryPhraseText }) {
  const [flipped, setFlipped] = useState(Array(22).fill(false));
  const [cardClasses, setCardClasses] = useState(Array(22).fill("card"));
  const [isDisable, setIsDisable] = useState(true);
  const [oneCardClick, setOneCardClick] = useState(false);

  const [shuffledCardImages] = useState(() => shuffleArray(cardImages));

  useEffect(() => {
    shuffledCardImages.forEach((_, i) => {
      setTimeout(() => {
        setCardClasses((prev) => {
          const updated = [...prev];
          updated[i] = `card ani${i}`;
          return updated;
        });
        if (i === shuffledCardImages.length - 1) {
          setCategoryPhraseText("카드를 고르세요!");
          setIsDisable(false);
        }
      }, 4000);
    });
  }, [setCategoryPhraseText, shuffledCardImages]);

  const handleCardClick = (i) => {
    if (isDisable || oneCardClick) return;

    setOneCardClick(true);
    setIsDisable(true);

    setTimeout(() => {
      setFlipped((prev) => {
        const updated = [...prev];
        updated[i] = true;
        return updated;
      });
    }, 2000);
  };

  return (
    <div className="taro-animation-container">
      <div className="card-list">
        {shuffledCardImages.map((img, i) => (
          <div
            key={i}
            className={`
              ${cardClasses[i]}
              ${flipped[i] ? "flipped" : ""}
              ${isDisable ? "" : "enable-hover"}`}
            onClick={() => {
              handleCardClick(i);
              isDisable ? setOneCardClick(false) : setOneCardClick(true);
            }}
          >
            <div className="card-inner">
              <img className="card-front" src={img} />
              <img className="card-back" src={TaroBack} />
            </div>
          </div>
        ))}
      </div>
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

  return (
    <CategoryLayout
      imgSrc={TaroImage}
      animationComponent={
        <TaroAnimation
          setResultShow={setResultShow}
          setCategoryPhraseText={setCategoryPhraseText}
        />
      }
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
