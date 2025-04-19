import CategoryLayout from "../components/CategoryLayout";
import WeatherInfoInput from "../components/WeatherInfoInput";
import WeatherImage from "../assets/weather/littleBlurry.png";
import sunny from "../assets/weather/sunny.png";
import rain from "../assets/weather/rain.png";
import blurry from "../assets/weather/blurry.png";
import littleBlurry from "../assets/weather/littleBlurry.png";
import snow from "../assets/weather/snow.png";
import React, { useState } from "react";
import "../css/CategoryLayout.css";

const weatherMap = {
  "clear sky": { image: sunny, phrase: "오늘의 날씨는 맑아요!" },

  "light rain": { image: rain, phrase: "오늘은 비가 와요." },
  "moderate rain": { image: rain, phrase: "오늘은 비가 와요." },
  "heavy intensity rain": { image: rain, phrase: "오늘은 비가 와요." },
  "very heavy rain": { image: rain, phrase: "오늘은 비가 와요." },
  "extreme rain": { image: rain, phrase: "오늘은 비가 와요." },
  "freezing rain": { image: rain, phrase: "오늘은 비가 와요." },
  "light intensity shower rain": { image: rain, phrase: "오늘은 비가 와요." },
  "shower rain": { image: rain, phrase: "오늘은 비가 와요." },
  "heavy intensity shower rain": { image: rain, phrase: "오늘은 비가 와요." },
  "ragged shower rain": { image: rain, phrase: "오늘은 비가 와요." },
  "light intensity drizzle": { image: rain, phrase: "오늘은 비가 와요." },
  drizzle: { image: rain, phrase: "오늘은 비가 와요." },
  "heavy intensity drizzle": { image: rain, phrase: "오늘은 비가 와요." },
  "light intensity drizzle rain": { image: rain, phrase: "오늘은 비가 와요." },
  "drizzle rain": { image: rain, phrase: "오늘은 비가 와요." },
  "heavy intensity drizzle rain": { image: rain, phrase: "오늘은 비가 와요." },
  "shower rain and drizzle": { image: rain, phrase: "오늘은 비가 와요." },
  "heavy shower rain and drizzle": { image: rain, phrase: "오늘은 비가 와요." },
  "shower drizzle": { image: rain, phrase: "오늘은 비가 와요." },

  "broken clouds": { image: blurry, phrase: "오늘은 흐린 날이에요." },
  "overcast clouds": { image: blurry, phrase: "오늘은 흐린 날이에요." },
  mist: { image: blurry, phrase: "오늘은 흐린 날이에요." },

  "few clouds": { image: littleBlurry, phrase: "오늘은 구름이 조금 있어요." },
  "scattered clouds": {
    image: littleBlurry,
    phrase: "오늘은 구름이 조금 있어요.",
  },

  "light snow": { image: snow, phrase: "오늘은 눈이 와요." },
  snow: { image: snow, phrase: "오늘은 눈이 와요." },
  "heavy snow": { image: snow, phrase: "오늘은 눈이 와요." },
  sleet: { image: snow, phrase: "오늘은 눈이 와요." },
  "light shower sleet": { image: snow, phrase: "오늘은 눈이 와요." },
  "shower sleet": { image: snow, phrase: "오늘은 눈이 와요." },
  "light rain and snow": { image: snow, phrase: "오늘은 눈이 와요." },
  "rain and snow": { image: snow, phrase: "오늘은 눈이 와요." },
  "light shower snow": { image: snow, phrase: "오늘은 눈이 와요." },
  "shower snow": { image: snow, phrase: "오늘은 눈이 와요." },
  "heavy shower snow": { image: snow, phrase: "오늘은 눈이 와요." },
};

function WeatherAnimation({ setResultShow, setCategoryPhraseText }) {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const fetchWeather = () => {
    if (!input) return;

    setIsFadingOut(true);
    setTimeout(() => {
      setShowInput(false);
    }, 500);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=792ff3066b1a91e7e54aabf9de16f2ee&units=metric&lang=en`
    )
      .then((res) => {
        if (!res.ok) throw new Error("정확한 도시명을 입력해 주세요.");
        return res.json();
      })
      .then((data) => {
        const original = data.weather[0].description;
        console.log(data.weather);
        const mapped = weatherMap[original];

        if (mapped) {
          setWeather(mapped);
          setCategoryPhraseText(mapped.phrase);
          setResultShow(true);
        } else {
          setWeather("unsupported");
          setCategoryPhraseText("날씨를 알 수 없어요.");
        }
        setResultShow(true);
      })
      .catch((err) => {
        alert(err.message);
        resetState();
      });
  };

  const resetState = () => {
    setIsFadingOut(false);
    setShowInput(true);
    setWeather("");
    setResultShow(false);
    setInput("");
    setCategoryPhraseText("오늘의 날씨운 보기");
  };

  return (
    <>
      {showInput && (
        <WeatherInfoInput
          input={input}
          setInput={setInput}
          onSubmit={fetchWeather}
          isFadingOut={isFadingOut}
        />
      )}
      <div
        className={`weather-animation-container ${isFadingOut && "fade-in"}`}
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {weather && (
          <img
            className="image"
            src={weather.image}
            alt="weather"
            style={{ height: "80%", width: "auto" }}
          />
        )}
      </div>
    </>
  );
}

const backgroundColor = "#EBEBEB";
const backgroundColor2 = "#D6D6D6";
const buttonColor = "#414141";
const buttonHoverColor = "#747474";

function Weather() {
  const [resultShow, setResultShow] = useState(false);
  const [categoryPhraseText, setCategoryPhraseText] =
    useState("오늘의 날씨운 보기");

  return (
    <CategoryLayout
      imgSrc={WeatherImage}
      animationComponent={
        <WeatherAnimation
          setResultShow={setResultShow}
          setCategoryPhraseText={setCategoryPhraseText}
        />
      }
      categoryPhraseText={categoryPhraseText}
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
