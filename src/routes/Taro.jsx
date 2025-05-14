import { useEffect, useState } from "react";
import CategoryLayout from "../components/CategoryLayout";
import TaroImage from "../assets/taro/taro.png";

import TaroBack from "../assets/taro/taro-card/taro_back.png";
import death from "../assets/taro/taro-card/Death.png";
import judgement from "../assets/taro/taro-card/Judgement.png";
import justice from "../assets/taro/taro-card/Justice.png";
import strength from "../assets/taro/taro-card/Strength.png";
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

function TaroAnimation({ setResultShow, setCategoryPhraseText }) {
  const [flipped, setFlipped] = useState(Array(22).fill(false));
  const [cardClasses, setCardClasses] = useState(Array(22).fill("card"));

  useEffect(() => {
    cardImages.forEach((_, i) => {
      setTimeout(() => {
        setCardClasses((prev) => {
          const updated = [...prev];
          updated[i] = `card ani${i}`;
          return updated;
        });
        if (i === cardImages.length - 1) {
          setCategoryPhraseText("카드를 고르세요!");
        }
      }, 4000);
    });
  }, [setCategoryPhraseText]);

  const handleFlip = (i) => {
    setFlipped((prev) => {
      const updated = [...prev];
      updated[i] = !updated[i];
      return updated;
    });
  };

  return (
    <div className="taro-animation-container">
      <div className="card-list">
        {cardImages.map((img, i) => (
          <div
            key={i}
            className={`${cardClasses[i]} ${flipped[i] ? "flipped" : ""}`}
            onClick={() => handleFlip(i)}
          >
            <div className="card-inner">
              <img className="card-front" src={img} alt="taro front" />
              <img className="card-back" src={TaroBack} alt="taro back" />
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
