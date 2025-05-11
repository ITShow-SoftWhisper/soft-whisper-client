import CategoryLayout from "../components/CategoryLayout";
import WeatherInfoInput from "../components/WeatherInfoInput";
import WeatherImage from "../assets/weather/littleBlurry.png";
import sunny from "../assets/weather/sunny.png";
import rain from "../assets/weather/rain.png";
import blurry from "../assets/weather/blurry.png";
import littleBlurry from "../assets/weather/littleBlurry.png";
import snow from "../assets/weather/snow.png";
import React, { useState, useEffect, useRef } from "react";
import "../css/CategoryLayout.css";
import "../css/WeatherAnimation.css";

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

const fortunes = [
  "오늘은 당신이 그동안 애써 외면해왔던 내면의 목소리에 귀 기울여야 할 시기입니다. 반복되는 일상 속에서 잊고 지낸 당신만의 진짜 목표와 가치가 천천히 떠오를 것이며, 그 깨달음은 앞으로의 방향을 결정짓는 나침반이 되어줄 것입니다. 주변의 조언보다는 자신의 직관을 믿고, 오늘 하루는 조용한 산책이나 일기 쓰기처럼 스스로와 대화하는 시간을 가져보는 것이 좋습니다.",

  "가장 가까운 사람일수록 때로는 가장 큰 오해의 대상이 되기 쉽습니다. 오늘 하루만큼은 상대의 말에 감정을 덧입히지 말고 있는 그대로 들어보세요. 그 속에 당신이 미처 몰랐던 진심이 담겨 있을 수 있습니다. 특히 갈등이 있었던 관계가 있다면, 지금이 바로 그 오해를 풀고 진정한 관계로 나아갈 수 있는 결정적인 순간입니다.",

  "눈앞에 있는 작은 문제에 너무 매몰되지 마세요. 지금 보이는 장애물은 당신을 성장시키기 위한 장치일 뿐이며, 오히려 이 시기를 지나고 나면 그 모든 경험이 더 넓은 시야와 깊은 통찰로 바뀌어 있을 것입니다. 오늘 당신이 마주한 고민은 단기적인 실패처럼 보일 수 있지만, 장기적으로는 당신의 인생의 흐름을 바꾸는 귀중한 자산이 될 수 있습니다.",

  "계속 달려오기만 했던 당신에게 오늘은 잠시 멈추어 숨 고르기를 허락해주는 날입니다. 멈춘다고 해서 실패가 아니며, 오히려 멈춤 속에서 진짜 에너지와 집중력이 회복될 수 있다는 사실을 기억하세요. 괜찮으니 잠깐 손을 놓고, 마음이 가는 대로 흘러가 보세요. 휴식 속에서 삶의 방향성이 자연스럽게 정리될 수 있습니다.",

  "지금 당신이 고민하고 있는 선택지는 단순한 길의 갈림이 아니라 삶의 질을 결정짓는 중요한 지점입니다. 빠른 선택보다는 신중함을, 타인의 의견보다는 당신 내면의 직감을 믿는 것이 옳습니다. 잠시 외부의 소음을 차단하고, 차분히 혼자 있는 시간을 가져보세요. 그 안에서 명확한 확신과 함께 올바른 결정이 자연스럽게 떠오를 것입니다.",
];

function WeatherAnimation({ setResultShow, setCategoryPhraseText }) {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showFortune, setShowFortune] = useState(false);

  const fetchWeather = () => {
    if (!input) return;

    setIsFadingOut(true);
    setTimeout(() => {
      setShowInput(false);
    }, 5000);

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
        } else {
          setWeather("unsupported");
          setCategoryPhraseText("날씨를 알 수 없어요.");
        }
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

  const getrandomFortune = () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    return fortunes[randomIndex];
  };

  useEffect(() => {
    if (weather && isFadingOut) {
      const timeout = setTimeout(() => {
        setShowFortune(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [weather, isFadingOut]);

  useEffect(() => {
    if (showFortune) {
      setResultShow(true);
    }
  }, [showFortune, setResultShow]);

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
          columnGap: "5%",
        }}
      >
        <div
          className="moveContent"
          style={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          {weather && (
            <img
              className={`image ${isFadingOut && "fade-in-image"}`}
              src={weather.image}
              alt="weather"
              style={{ height: "80%", width: "auto" }}
            />
          )}
        </div>
        {showFortune && (
          <p
            className="jua-regular fortune"
            style={{
              width: "30%",
              height: "80%",
              fontSize: "130%",
              lineHeight: "1.5",
              padding: "4% 0 0",
            }}
          >
            {getrandomFortune()}
          </p>
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
