import CategoryLayout from "../components/CategoryLayout";
import TaroImage from "../assets/taro.png";

function TaroAnimation() {
  return (
    <div className="taro-animation-container">
      <div></div>
    </div>
  );
}

const backgroundColor = "#E4CFFF";
const backgroundColor2 = "#C79CFF";
const buttonColor = "#D468FF";
const buttonHoverColor = "#cb49ff";

function Taro() {
  return (
    <CategoryLayout
      imgSrc={TaroImage}
      animationComponent={<TaroAnimation />}
      categoryPhraseText="오늘의 타로 확인하기"
      categoryButtonText="타로 보기"
      backgroundColor={backgroundColor}
      backgroundColor2={backgroundColor2}
      buttonColor={buttonColor}
      buttonHoverColor={buttonHoverColor}
    />
  );
}

export default Taro;
