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
  "clear sky": sunny,

  "light rain": rain,
  "moderate rain": rain,
  "heavy intensity rain": rain,
  "very heavy rain": rain,
  "extreme rain": rain,
  "freezing rain": rain,
  "light intensity shower rain": rain,
  "shower rain": rain,
  "heavy intensity shower rain": rain,
  "ragged shower rain": rain,
  "light intensity drizzle": rain,
  drizzle: rain,
  "heavy intensity drizzle": rain,
  "light intensity drizzle rain": rain,
  "drizzle rain": rain,
  "heavy intensity drizzle rain": rain,
  "shower rain and drizzle": rain,
  "heavy shower rain and drizzle": rain,
  "shower drizzle": rain,

  "broken clouds": blurry,
  "overcast clouds": blurry,

  "few clouds": littleBlurry,
  "scattered clouds": littleBlurry,

  "light snow": snow,
  snow: snow,
  "heavy snow": snow,
  sleet: snow,
  "light shower sleet": snow,
  "shower sleet": snow,
  "light rain and snow": snow,
  "rain and snow": snow,
  "light shower snow": snow,
  "shower snow": snow,
  "heavy shower snow": snow,
};

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
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=792ff3066b1a91e7e54aabf9de16f2ee&units=metric&lang=en`
    )
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((data) => {
        const original = data.weather[0].description;
        const mapped = weatherMap[original];

        setTimeout(() => {
          if (mapped) {
            setWeather(mapped);
            setResultShow(true);
          } else {
            setWeather("unsupported");
          }
          setResultShow(true);
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        alert(err.message);
        resetState();
      });
  };

  const resetState = () => {
    setTimeout(() => {
      setIsFadingOut(false);
      setShowInput(true);
      setLoading(false);
      setWeather("");
      setResultShow(false);
      setInput("");
    }, 1);
  };

  const unsupported = () => {
    if (weather === "unsupported") return <p>지원하지 않는 날씨에요</p>;
    return (
      <img
        className="image"
        src={weather}
        alt="weather"
        style={{ height: "80%", width: "auto" }}
      />
    );
  };

  return (
    <div
      className="weather-animation-container"
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {showInput && (
        <WeatherInfoInput
          input={input}
          setInput={setInput}
          onSubmit={fetchWeather}
          isFadingOut={isFadingOut}
        />
      )}

      {loading && <p>운세 알아보는 중...</p>}

      {!loading && weather && unsupported()}
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
