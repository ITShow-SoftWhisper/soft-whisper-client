import CategoryLayout from "@/components/CategoryLayout";
import WeatherInfoInput from "@/components/WeatherInfoInput";
import WeatherImage from "@/assets/weather/littleBlurry.png";
import sunny from "@/assets/weather/sunny.png";
import rain from "@/assets/weather/rain.png";
import blurry from "@/assets/weather/blurry.png";
import littleBlurry from "@/assets/weather/littleBlurry.png";
import snow from "@/assets/weather/snow.png";
import { useState, useEffect } from "react";
import "@/css/CategoryLayout.css";
import "@/css/WeatherAnimation.css";

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

  "오늘은 자신의 감정을 솔직하게 표현하는 것이 중요한 날입니다. 억누르지 말고, 자신이 느끼는 감정들을 있는 그대로 드러내 보세요. 감정이 터져 나오기 전에 억지로 참는 것이 더 큰 부담이 될 수 있습니다. 당신의 감정은 타인에게도 전해질 수 있으며, 이를 통해 더 깊은 관계를 맺을 기회를 얻게 될 것입니다.",

  "변화가 두려운 당신에게 오늘은 새로운 시도를 해보는 것이 좋습니다. 작은 변화부터 시작해보세요. 그것이 곧 큰 변화를 일으킬 수 있는 출발점이 될 것입니다. 한 걸음 한 걸음 나아가는 것에 두려움을 가지지 마세요. 오늘의 작은 용기가 내일의 큰 성취를 이루는 열쇠가 될 것입니다.",

  "과거의 실패나 실수에 얽매이지 말고, 지금 이 순간에 집중하세요. 지나간 일은 이미 지나간 일입니다. 오늘을 살아가며, 그동안 미뤄왔던 목표나 계획을 다시 점검하고, 한 걸음씩 나아가보세요. 당신이 상상하는 그 이상의 기회가 당신을 기다리고 있습니다.",

  "당신이 지금 겪고 있는 어려움은 결국 당신을 더욱 강하게 만들 것입니다. 이 순간이 힘들더라도, 그것이 바로 성장의 기회임을 명심하세요. 과정을 통해 얻는 교훈이 훗날 더 큰 목표를 달성하는 데 중요한 자산이 될 것입니다. 지금은 인내의 시간이지만, 반드시 보상을 얻게 될 것입니다.",

  "자신의 가치를 의심하지 마세요. 오늘은 특히 자기 자신에게 긍정적인 말을 건네고, 자신을 인정하는 시간을 가지세요. 다른 사람들이 무엇을 말하든, 당신의 능력과 가능성은 무한합니다. 스스로를 믿고 한 걸음씩 나아가세요. 그렇게 하면 어느새 당신은 상상도 못한 곳에 도달해 있을 것입니다.",

  "오늘은 주변 사람들에게 감사의 말을 전하는 것이 좋습니다. 작은 친절과 배려가 큰 힘이 될 수 있다는 것을 기억하세요. 사람들은 간혹 자신이 누군가에게 얼마나 영향을 미쳤는지 모를 때가 많습니다. 당신의 감사가 누군가에게 큰 위로가 될 수 있습니다.",

  "운명의 흐름이 당신에게 좋은 기회를 제공하고 있습니다. 지금은 그 기회를 놓치지 않고, 빠르게 행동하는 것이 중요합니다. 주저하지 말고, 주어진 기회를 받아들여 새로운 도전에 나서세요. 이 기회가 당신에게 새로운 길을 열어줄 것입니다.",

  "자신의 내면에 있는 불안이나 걱정을 잠시 내려놓고, 마음을 편안하게 해보세요. 불안은 당신의 삶을 짓누를 뿐입니다. 오늘은 스스로에게 안정을 찾을 수 있는 시간을 주고, 편안하게 심호흡을 하세요. 마음이 차분해지면, 보다 명확한 결정을 내릴 수 있게 될 것입니다.",

  "지금이 바로 새로운 사람들과의 만남을 시도해 볼 때입니다. 외부와의 연결이 당신에게 중요한 인사이트와 도움을 줄 수 있습니다. 새로운 사람을 만나며 얻을 수 있는 정보나 기회가 당신에게 큰 도움이 될 수 있으니, 열린 마음으로 다가가세요.",

  "오늘은 주변 사람들과의 소통을 더욱 활발하게 하세요. 대화를 통해 새로운 아이디어가 떠오를 수 있으며, 그 아이디어가 당신의 작업에 큰 영향을 미칠 수 있습니다. 특히, 평소에 잘 알지 못했던 사람과의 대화가 중요한 영감을 줄 수 있으니, 열린 마음으로 대화를 나누세요.",

  "어떤 일이든 처음 시작할 때는 두려움이 따르기 마련입니다. 하지만 그 두려움을 극복하고 한 걸음씩 나아가다 보면, 결국 그 길이 올바른 길임을 알게 될 것입니다. 오늘은 두려움을 인정하고, 그것을 극복할 수 있는 작은 도전을 해보세요. 그것이 곧 큰 변화를 만들어낼 것입니다.",

  "당신이 고민하는 문제의 해결책은 이미 당신 안에 존재합니다. 조금만 시간을 내어 차분하게 생각해보세요. 내면의 목소리에 귀 기울이면, 그 답이 자연스럽게 떠오를 것입니다. 자신을 믿고, 그 답을 따르세요. 오늘 하루는 명확한 결정을 내릴 수 있는 날입니다.",

  "세상의 변화는 한 사람의 작은 행동에서 시작됩니다. 오늘은 당신이 그 작은 변화를 시작할 수 있는 좋은 기회입니다. 무엇이든 당신이 먼저 손을 내밀고 시작하면, 주변도 자연스럽게 따라올 것입니다. 작은 실천이 큰 변화를 만들어낼 수 있다는 것을 기억하세요.",

  "오늘은 사람들에게 친절과 배려를 아끼지 마세요. 당신의 따뜻한 말 한 마디가 다른 사람에게 큰 위로가 될 수 있습니다. 작은 친절이 쌓이면, 그것이 큰 행복으로 돌아올 것입니다. 오늘 하루, 주위 사람들에게 작은 배려를 실천해보세요.",

  "때로는 불확실한 상황에서 길을 찾아가야 할 때가 있습니다. 지금 당신은 그 불확실한 상황에 처해 있지만, 그것이 바로 새로운 가능성을 여는 기회일 수 있습니다. 두려워하지 말고, 그 불확실성을 기회로 바꾸세요. 시간이 지나면 그 선택이 올바른 선택이었다는 것을 알게 될 것입니다.",

  "지금은 당신의 능력을 믿고, 스스로에게 도전할 때입니다. 세상이 당신을 의심할지라도, 가장 중요한 것은 자신을 믿는 것입니다. 오늘은 자신에게 긍정적인 말을 건네고, 도전을 받아들일 준비를 하세요. 당신은 상상 이상으로 강한 사람입니다.",

  "오늘은 일상에서 벗어나 새로운 경험을 해보세요. 작은 변화가 큰 차이를 만들어낼 수 있습니다. 지금까지 해보지 않았던 일을 시도해보면, 예상치 못한 즐거움을 찾을 수 있을 것입니다. 변화는 때로 두려움을 동반하지만, 그 두려움을 넘어설 때 진정한 성장이 일어납니다.",

  "당신이 겪고 있는 스트레스나 불안은 잠시 멈추고, 그 원인을 다시 한 번 점검해보세요. 때로는 지나친 걱정이 상황을 더 악화시킬 수 있습니다. 조금만 마음을 가라앉히고, 문제를 해결할 방법을 찾아보세요. 침착하게 대응하는 것이 중요합니다.",

  "당신의 노력은 결코 헛되지 않습니다. 지금 당장은 그 성과가 보이지 않을 수 있지만, 언젠가는 그 노력들이 결실을 맺게 될 것입니다. 인내심을 가지고 계속해서 나아가세요. 지금의 고생이 미래의 큰 성취로 이어질 것입니다.",

  "오늘은 당신이 이전에 경험하지 못한 방식으로 세상을 바라보는 날입니다. 새로운 시각에서 문제를 해결하고, 새로운 아이디어를 떠올려보세요. 변화는 결국 당신의 시각에서 시작되며, 그 시각이 세상을 바꾸는 중요한 열쇠가 될 것입니다.",

  "어려운 상황에서 새로운 해결책을 찾는 능력이 오늘 당신에게 중요한 역할을 하게 될 것입니다. 고정관념을 깨고, 기존의 방법과 다른 접근 방식을 시도해보세요. 그렇게 하면 문제를 보다 창의적이고 효과적으로 해결할 수 있을 것입니다.",

  "자신의 길을 가는 것은 중요하지만, 때때로 주변 사람들과의 협력도 중요한 날입니다. 오늘은 혼자서 모든 것을 해결하려 하지 말고, 주변의 도움을 받아보세요. 협력은 힘이 될 수 있으며, 그 과정에서 얻는 경험은 당신을 더욱 강하게 만들 것입니다.",

  "오늘은 대인 관계에서 신중함이 필요한 날입니다. 어떤 말을 하거나 행동을 할 때, 그 의도가 잘 전달될 수 있도록 신경을 쓰세요. 갈등을 피하고 원활한 관계를 유지하는 것이 중요합니다. 특히, 감정적으로 반응하기보다는 차분하고 이성적인 판단을 하세요.",

  "오늘은 다른 사람의 입장을 이해하려는 노력이 필요한 날입니다. 상대방의 말을 경청하고, 그 사람의 입장에서 상황을 바라보세요. 그렇게 함으로써 불필요한 오해를 줄이고, 서로 더 깊은 관계를 형성할 수 있을 것입니다.",

  "오늘은 자신을 위한 시간을 가지는 것이 좋습니다. 자신에게 필요한 휴식을 취하고, 내면을 돌보는 시간을 가지세요. 이 시간을 통해 마음의 평화를 얻고, 삶에 대한 방향을 다시 설정할 수 있을 것입니다.",

  "오늘은 주어진 일에 집중하고, 그 일에 최선을 다하는 것이 중요한 날입니다. 다른 사람들의 방해나 의견에 휘둘리지 않고, 자신의 목표를 향해 꾸준히 나아가세요. 그 결과는 곧 당신의 노력에 비례할 것입니다.",

  "당신은 이제 새로운 도전의 기로에 서 있습니다. 조금 두렵기도 하겠지만, 그 두려움을 이겨내고 나아가세요. 그 도전이 결국 당신을 한층 성장하게 만들어줄 것입니다. 그리고 그 과정에서 얻은 경험이 중요한 자산이 될 것입니다.",

  "오늘은 몸과 마음을 치유하는 시간을 가지세요. 내면의 피로를 풀고, 자신을 돌보는 시간이 중요합니다. 건강을 잘 챙기고, 휴식을 취하는 것이 당신의 에너지를 회복하는 첫걸음이 될 것입니다.",

  "오늘은 아무리 어려운 상황이라도 긍정적인 태도를 유지하는 것이 중요합니다. 당신의 마음가짐이 결국 결과를 바꿀 수 있습니다. 어려운 상황에서도 긍정적인 시각으로 바라보면, 좋은 결과를 끌어낼 수 있을 것입니다.",

  "오늘은 창의력과 직관을 믿고, 새로운 아이디어를 떠올려보세요. 때로는 일상 속에서 가장 단순한 것에서 영감을 얻을 수 있습니다. 새로운 아이디어나 접근 방식이 성공적인 결과로 이어질 것입니다.",
];

function WeatherAnimation({
  setResultShow,
  setCategoryPhraseText,
  setWeatherBackgroundColor1,
  setWeatherBackgroundColor2,
  fortune,
  setFortune,
  setWeatherImageUrl,
}) {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showFortune, setShowFortune] = useState(false);

  const fetchWeather = () => {
    if (!input) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=792ff3066b1a91e7e54aabf9de16f2ee&units=metric&lang=en`
    )
      .then((res) => {
        if (!res.ok) throw new Error("정확한 도시명을 입력해 주세요.");
        return res.json();
      })
      .then((data) => {
        const original = data.weather[0].description;
        const mapped = weatherMap[original];

        if (mapped) {
          if (mapped.image === sunny) {
            setWeatherBackgroundColor1("#fff387");
            setWeatherBackgroundColor2("#fff9c6");
          } else if (mapped.image === rain) {
            setWeatherBackgroundColor1("#5372c5");
            setWeatherBackgroundColor2("#EBEBEB");
          } else if (mapped.image === snow) {
            setWeatherBackgroundColor1("#98bcff");
            setWeatherBackgroundColor2("#c3d8ff");
          }

          setWeather(mapped);
          setCategoryPhraseText(mapped.phrase);
          setWeatherImageUrl(mapped.image);

          setIsFadingOut(true);
          setTimeout(() => {
            setShowInput(false);
          }, 5000);
        } else {
          throw new Error("지원하지 않는 날씨 유형입니다.");
        }
      })
      .catch((err) => {
        alert(err.message);
        setInput("");
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
    setShowFortune(false);
  };

  const getrandomFortune = () => {
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    return fortunes[randomIndex];
  };

  useEffect(() => {
    if (weather && isFadingOut) {
      const timeout = setTimeout(() => {
        setFortune(getrandomFortune());
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
          setShowInput={setShowInput}
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
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "30%",
          }}
        ></div>
        {weather && (
          <div
            className="moveContent"
            style={{ display: "grid", placeItems: "center", height: "100%" }}
          >
            <img
              className={`image ${isFadingOut && "fade-in-image"}`}
              src={weather.image}
              alt="weather"
              style={{ height: "40%", width: "auto" }}
            />
          </div>
        )}
        {showFortune && (
          <p
            className="jua-regular fortune"
            style={{
              display: "flex",
              alignItems: "center",
              width: "30%",
              height: "80%",
              fontSize: "130%",
              lineHeight: "1.5",
              padding: "1% 0 0",
              margin: "0",
            }}
          >
            {fortune}
          </p>
        )}
      </div>
    </>
  );
}

const buttonColor = "#545454";
const buttonHoverColor = "#000000";

function Weather() {
  const [resultShow, setResultShow] = useState(false);
  const [categoryPhraseText, setCategoryPhraseText] =
    useState("오늘의 날씨운 보기");
  const [weatherBackgroundColor1, setWeatherBackgroundColor1] =
    useState("#EBEBEB");
  const [weatherBackgroundColor2, setWeatherBackgroundColor2] =
    useState("#D6D6D6");
  const [fortune, setFortune] = useState("");
  const [weatherImageUrl, setWeatherImageUrl] = useState("");

  return (
    <CategoryLayout
      categoty="weather"
      weatherImageUrl={weatherImageUrl}
      fortune={fortune}
      imgSrc={WeatherImage}
      animationComponent={
        <WeatherAnimation
          setResultShow={setResultShow}
          setCategoryPhraseText={setCategoryPhraseText}
          setWeatherBackgroundColor1={setWeatherBackgroundColor1}
          setWeatherBackgroundColor2={setWeatherBackgroundColor2}
          fortune={fortune}
          setFortune={setFortune}
          setWeatherImageUrl={setWeatherImageUrl}
        />
      }
      categoryPhraseText={categoryPhraseText}
      categoryButtonText="날씨운 보기"
      backgroundColor={weatherBackgroundColor2}
      backgroundColor2={weatherBackgroundColor1}
      buttonColor={buttonColor}
      buttonHoverColor={buttonHoverColor}
      resultShow={resultShow}
    />
  );
}

export default Weather;
