import React from "react";
import CardImage from "./assets/card-inner-test.png";
import "./App.css";

function CardMenu({ title, imgSrc }) {
  return (
    <div className="menu-card">
      <h2>{title}</h2>
      <img src={imgSrc} alt="Modify" className="menu-img"></img>
    </div>
  );
}

function App() {
  return (
    <div className="main-container">
      <CardMenu title="book" imgSrc={CardImage}></CardMenu>
      <CardMenu title="taro" imgSrc={CardImage}></CardMenu>
      <CardMenu title="fortune" imgSrc={CardImage}></CardMenu>
      <CardMenu title="lucky" imgSrc={CardImage}></CardMenu>
      <CardMenu title="weather" imgSrc={CardImage}></CardMenu>
    </div>
  );
}

export default App;
