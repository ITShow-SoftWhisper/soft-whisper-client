import CategoryLayout from "../components/CategoryLayout";
import WeatherImage from "../assets/weather.png";

function WeatherAnimation() {
  const weatherAPI = "";

  return (
    <div className="weather-animation-container">
      <div></div>
    </div>
  );
}

const backgroundColor = "#EBEBEB";
const backgroundColor2 = "#D6D6D6";
const buttonColor = "#414141";                      
const buttonHoverColor = "#535353";

function Weather() {
  return (
    <CategoryLayout
      imgSrc={WeatherImage}
      animationComponent={<WeatherAnimation />}
      categoryPhraseText="오늘의 날씨운 보기"
      categoryButtonText="날씨운 보기"
      backgroundColor={backgroundColor}
      backgroundColor2={backgroundColor2}
      buttonColor={buttonColor}
      buttonHoverColor={buttonHoverColor}
    />
  );
}

export default Weather;
