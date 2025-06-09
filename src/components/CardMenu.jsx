import React from "react";
import { Link } from "react-router-dom";
import "@/css/App.css";

function CardMenu({
  id,
  title,
  imgSrc,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <Link
      to={`/${id}`}
      className={`menu-card ${isHovered ? "menu-card-hovered" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <h2 className="jua-regular">{title}</h2>
      <img src={imgSrc} alt="Modify" className="menu-img" />
    </Link>
  );
}

export default CardMenu;
