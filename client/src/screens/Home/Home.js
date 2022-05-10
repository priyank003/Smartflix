import React, { useEffect, useState } from "react";
import Landing from "./components/Landing/Landing";
import { Container } from "react-bootstrap";
import RowItemSlider from "./components/RowItemSlider/RowItemSlider";

import "./Home.css";

export default function Home() {
  const [trendingMovieData, settrendingMovieData] = useState([]);
  const [latestShowData, setlatestShowData] = useState([]);
  const [top_rated, setTop_rated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const getData = (api, setState) => {
    try {
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          setState(data.results);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(
      "https://api.themoviedb.org/3/trending/all/day?api_key=ab414ecaafc012ffce4c584b0924aa87",
      settrendingMovieData
    );

    getData(
      "https://api.themoviedb.org/3/tv/popular?api_key=ab414ecaafc012ffce4c584b0924aa87&language=en-US",
      setlatestShowData
    );
    getData(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=ab414ecaafc012ffce4c584b0924aa87&language=en-US&page=1",
      setTop_rated
    );
    getData(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=ab414ecaafc012ffce4c584b0924aa87&language=en-US&page=1",
      setUpcoming
    );
  }, []);

  return (
    <div className="home__container">
      <div className="home__landing">
        <Landing />
      </div>
      <div className="home__main">
        <div className="home__main-overlay"></div>
        <div className="home__catalogues">
          <RowItemSlider header="Trending Movies" data={trendingMovieData} />
          <RowItemSlider header="Latest Tv Shows" data={latestShowData} />
          <RowItemSlider header="Top Rated" data={top_rated} />
          <RowItemSlider header="Upcoming Movies" data={upcoming} />
        </div>
      </div>
    </div>
  );
}
