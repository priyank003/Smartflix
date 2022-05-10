import React from "react";
import movieImage from "../../../../../assets/Home/catalogue/Rectangle 39.png";
import "./RowItemCard.css";

export default function RowItemCard({ img, name }) {
  return (
    <div className="rowitemcard__container">
      <div className="rowitemcard__img">
        <img src={`https://image.tmdb.org/t/p/w500${img}`} alt={name} />
      </div>
      {/* <div className="rowitemcard__name">
        <p>{name}</p>
      </div> */}
      <div className="rowitemcard__overlay"></div>
    </div>
  );
}
