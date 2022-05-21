import React, { useRef, useState } from "react";
import RowItemCard from "./components/RowItemCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./RowItemSlider.css";

export default function RowItemSlider(props) {
  const [iseMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);

  const carouselRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = carouselRef.current.getBoundingClientRect().x - 50;

    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      carouselRef.current.style.transform = `translate(${265 + distance}px)`;
    }
    if (direction === "right" && slideNumber < props.data.length - 1) {
      setSlideNumber(slideNumber + 1);
      carouselRef.current.style.transform = `translate(${-265 + distance}px)`;
    }
  };
  return (
    <div className="rowitemslider__container" style={props.style}>
      <div className="rowitemslider__header text__subtitle">{props.header}</div>
      <div className="rowitemslider__carousel-container">
        <ArrowBackIosNewIcon
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !iseMoved && "none" }}
        />
        <div className="rowitemslider__carousel" ref={carouselRef}>
          {props.data
            ? props.data.map((movie) => {
                return (
                  <RowItemCard
                    img={movie.poster_path}
                    name={movie.original_title}
                  />
                );
              })
            : ""}

          {/* <RowItemCard />
          <RowItemCard />
          <RowItemCard />
          <RowItemCard />
          <RowItemCard />
          <RowItemCard /> */}
        </div>
        <ArrowForwardIosIcon
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
