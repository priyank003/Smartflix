import React, { useEffect, useRef, useState } from "react";
import RowItemCard from "./components/RowItemCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { v4 as uuidv4 } from "uuid";
import "./RowItemSlider.css";

export default function RowItemSlider(props) {
  // const [movieData, setMovieData] = useState(props.data);
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
          <SkeletonTheme
            color="#1a1919"
            baseColor="#1a1919"
            highlightColor="#222121"
          >
            {props.data.map((movie) => {
              return movie.poster_path ? (
                <RowItemCard
                  key={uuidv4()}
                  img={String(movie.poster_path)}
                  name={movie.original_title}
                />
              ) : (
                [Array(5)].map(() => (
                  <Skeleton
                    key={uuidv4()}
                    duration={0.7}
                    width={250}
                    style={{
                      marginRight: "15px",
                      minHeight: "300px",
                      height: "100%",
                    }}
                  />
                ))
              );
            })}
            {/* {props.data.length
              ? props.data.map((movie) => {
                  console.log(movie.poster_path);
                  return movie.poster_path ? (
                    <RowItemCard
                      key={uuidv4()}
                      img={movie.poster_path}
                      name={movie.original_title}
                    />
                  ) : (
                    ""
                  );
                })
              : [...Array(15)].map(() => (
                  <Skeleton
                    key={uuidv4()}
                    duration={0.7}
                    width={250}
                    height={300}
                    style={{ marginRight: "15px" }}
                  />
                ))} */}
          </SkeletonTheme>
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
