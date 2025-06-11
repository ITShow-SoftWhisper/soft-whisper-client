import React, { useState } from "react";
import "../css/CategorySelector.css";
import Love from "../assets/fortune/love.png";
import Comfort from "../assets/fortune/comfort.png";
import Fun from "../assets/fortune/fun.png";
import Grown from "../assets/fortune/grown.png";
import Positive from "../assets/fortune/positive.png";

const categories = [
  { key: "positive", emoji: Positive, label: "긍정" },
  { key: "comfort", emoji: Comfort, label: "위로" },
  { key: "love", emoji: Love, label: "사랑" },
  { key: "fun", emoji: Fun, label: "재미" },
  { key: "growth", emoji: Grown, label: "성장" },
];

function CategorySelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  // 카테고리 클릭 시 실행되는 함수
  const handleClick = (key) => {
    setSelected(key);

    setTimeout(() => {
      onSelect(key);
    }, 1500);
  };

  return (
    <div className="category-selector">
      {/* 아무것도 선택되지 않았을 때만 선택 UI 표시 */}
      {!selected &&
        categories.map((cat) => (
          <div
            key={cat.key} // 각 항목 고유 key
            className="category-card"
            onClick={() => handleClick(cat.key)}
          >
            <img src={cat.emoji} alt={cat.label} className="emoji-image" />
            <div className="label">{cat.label}</div>
          </div>
        ))}

      {selected && (
        <div className="category-result">
          <img
            src={categories.find((c) => c.key === selected).emoji}
            alt={selected}
            className="selected-image bounce"
          />
          <div className="category-transition-text">
            포춘쿠키가 열리는 중...
          </div>
        </div>
      )}
    </div>
  );
}

export default CategorySelector;