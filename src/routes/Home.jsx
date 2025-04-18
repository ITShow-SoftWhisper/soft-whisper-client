import React, { useState, useEffect } from "react";
import Book from "../assets/book.png";
import Fortune from "../assets/fortune.png";
import Lucky from "../assets/lucky.png";
import Taro from "../assets/taro.png";
import Weather from "../assets/weather/littleBlurry.png";
import CardMenu from "../components/CardMenu";
import "../css/App.css";

const cardData = [
  { id: "book", title: "오늘의 책 운세", imgSrc: Book, backgroundImage: Book },
  { id: "taro", title: "오늘의 타로", imgSrc: Taro, backgroundImage: Taro },
  {
    id: "fortune",
    title: "오늘의 포춘쿠키",
    imgSrc: Fortune,
    backgroundImage: Fortune,
  },
  {
    id: "lucky",
    title: "오늘의 행운복권",
    imgSrc: Lucky,
    backgroundImage: Lucky,
  },
  {
    id: "weather",
    title: "오늘의 날씨운",
    imgSrc: Weather,
    backgroundImage: Weather,
  },
];

function Home() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isManualHover, setIsManualHover] = useState(false);

  useEffect(() => {
    if (isManualHover) return;

    setHoverIndex(0);

    let index = 1;
    const interval = setInterval(() => {
      setHoverIndex(index);
      index = (index + 1) % cardData.length;
    }, 5000);

    return () => clearInterval(interval);
  }, [isManualHover]);

  const backgroundColors = [
    "#BED5FF",
    "#D6B7FF",
    "#FFF9C7",
    "#CCFFBF",
    "#EBEBEB",
  ];

  return (
    <div
      className="main-container"
      style={{
        backgroundColor: backgroundColors[hoverIndex],
        backgroundImage:
          hoverIndex !== null
            ? `url(${cardData[hoverIndex].backgroundImage})`
            : "none",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        transition: "background 0.5s ease-in-out",
      }}
    >
      <div className="card-container">
        {cardData.map((card, index) => (
          <CardMenu
            id={card.id}
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
    </div>
  );
}

export default Home;
