import React, { useState, useEffect } from "react";
import Book from "./assets/book.png";
import Fortune from "./assets/fortune.png";
import Lucky from "./assets/lucky.png";
import Taro from "./assets/taro.png";
import Weather from "./assets/weather.png";
import "./App.css";

const cardData = [
  { title: "오늘의 책 운세", imgSrc: Book },
  { title: "오늘의 타로", imgSrc: Taro },
  { title: "오늘의 포춘쿠키", imgSrc: Fortune },
  { title: "오늘의 행운복권", imgSrc: Lucky },
  { title: "오늘의 날씨운", imgSrc: Weather },
];

function CardMenu({ title, imgSrc, isHovered, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className={`menu-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h2 className="jua-regular">{title}</h2>
      <img src={imgSrc} alt="Modify" className="menu-img" />
    </div>
  );
}

function App() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isManualHover, setIsManualHover] = useState(false);

  useEffect(() => {
    if (isManualHover) return;

    let index = 0;
    const interval = setInterval(() => {
      setHoverIndex(index);
      index = (index + 1) % cardData.length;
    }, 3000);

    return () => clearInterval(interval);
  }, [isManualHover]);

  return (
    <div className="main-container">
      {cardData.map((card, index) => (
        <CardMenu
          key={index}
          title={card.title}
          imgSrc={card.imgSrc}
          isHovered={hoverIndex === index}
          onMouseEnter={() => {
            setIsManualHover(true);
            setHoverIndex(index);
          }}
          onMouseLeave={() => {
            setIsManualHover(false);
          }}
        />
      ))}
    </div>
  );
}

export default App;
