import CategoryLayout from "../components/CategoryLayout";
import WeatherInfoInput from "../components/WeatherInfoInput";
import WeatherImage from "../assets/weather/littleBlurry.png";
import React, { useState } from "react";

function WeatherAnimation({ setResultShow }) {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchWeather = () => {
    if (!input) return;

    setIsFadingOut(true);
    setTimeout(() => {
      setShowInput(false);
      setLoading(true);
    }, 500);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=792ff3066b1a91e7e54aabf9de16f2ee&units=metric&lang=kr`
    )
      .then((res) => {
        if (!res.ok) throw new Error("도시를 찾을 수 없습니다");
        return res.json();
      })
      .then((data) => {
        setTimeout(() => {
          setWeather(data.weather[0].description);
          setLoading(false);
          setResultShow(true);
        }, 1500);
      })
      .catch((err) => {
        alert(err.message);
        setTimeout(() => {
          setIsFadingOut(false);
          setShowInput(true);
          setLoading(false);
          setWeather("");
          setResultShow(false);
          setInput("");
        }, 1);
      });
  };

  return (
    <div className="weather-animation-container">
      {showInput && (
        <WeatherInfoInput
          input={input}
          setInput={setInput}
          onSubmit={fetchWeather}
          isFadingOut={isFadingOut}
        />
      )}
      {loading && <p>운세를 알아보는 중...</p>}
      {!loading && weather && <p>날씨: {weather}</p>}
    </div>
  );
}

const backgroundColor = "#EBEBEB";
const backgroundColor2 = "#D6D6D6";
const buttonColor = "#414141";
const buttonHoverColor = "#747474";

function Weather() {
  const [resultShow, setResultShow] = useState(false);

  return (
    <CategoryLayout
      imgSrc={WeatherImage}
      animationComponent={<WeatherAnimation setResultShow={setResultShow} />}
      categoryPhraseText="오늘의 날씨운 보기"
      categoryButtonText="날씨운 보기"
      backgroundColor={backgroundColor}
      backgroundColor2={backgroundColor2}
      buttonColor={buttonColor}
      buttonHoverColor={buttonHoverColor}
      resultShow={resultShow}
    />
  );
}

export default Weather;
