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

  // const getData = (api, setState) => {
  //   try {
  //     fetch(api)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setState(data.results);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getRegressionData = async (api, setData) => {
    const recRes = await fetch(api);
    const recData = await recRes.json();

    recData.map(async (movie) => {
      const imgRes = await fetch(
        `https://api.themoviedb.org/3/find/${movie.imdbId}?api_key=ab414ecaafc012ffce4c584b0924aa87&language=en-US&external_source=imdb_id`
      );

      const imgResData = await imgRes.json();
      movie["poster_path"] = imgResData.movie_results[0].poster_path;
    });

    setData(recData);
  };

  let userId = 10;
  useEffect(() => {
    getRegressionData(
      `http://localhost:9000/${userId}/regression`,
      settrendingMovieData
    );
    getRegressionData(
      `http://localhost:9000/${userId}/contentbased`,
      setlatestShowData
    );
    getRegressionData(
      `http://localhost:9000/${userId}/collab-user`,
      setTop_rated
    );
    getRegressionData(
      `http://localhost:9000/${userId}/collab-item`,
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
          {trendingMovieData ? (
            <RowItemSlider header="Regression Based" data={trendingMovieData} />
          ) : (
            <p>Loading regression Data</p>
          )}

          {latestShowData ? (
            <RowItemSlider
              header="Content based of Batman begins"
              data={latestShowData}
            />
          ) : (
            <p>Loading content based data</p>
          )}
          {top_rated ? (
            <RowItemSlider header="User Collabrative" data={top_rated} />
          ) : (
            <p>Loading user Collabrative based data</p>
          )}
          {upcoming ? (
            <RowItemSlider header="Item Collabrative" data={upcoming} />
          ) : (
            <p>Loading item collaborative based data</p>
          )}
        </div>
      </div>
    </div>
  );
}
