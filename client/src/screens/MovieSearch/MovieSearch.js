import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./MovieSearch.css";
import { getImageData } from "../../Api/Api";
import RowItemSlider from "../Home/components/RowItemSlider/RowItemSlider";

export default function MovieSearch() {
  const searchInfo = useSelector((state) => state.searchInfo.similarMovieTitle);

  const { movie } = useParams();

  const [searchResults, setSearchResults] = useState([]);

  const submitSearchHandler = async () => {
    const sugggestionRes = await fetch("http://localhost:8000/movie/search", {
      method: "POST",
      body: JSON.stringify({
        name: movie,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await sugggestionRes.json();

    data.movieResults.map(async (movie) => {
      const movieData = await getImageData(movie.imdb_id);
      // const movieData = await getImageData(movie.imdbId);
      // console.log(movieData.movie_results[0].poster_path);
      try {
        movie["poster_path"] = movieData.movie_results[0].poster_path;
      } catch (err) {
        console.log(err);
      }
    });

    setSearchResults(data.movieResults);
  };

  const getRecommendationData = async (api, setData) => {
    const recRes = await fetch(api);
    const recData = await recRes.json();

    await recData.map(async (movie) => {
      const movieData = await getImageData(movie.imdbId);

      try {
        movie["poster_path"] = movieData.movie_results[0].poster_path;
      } catch (err) {
        console.log(err);
      }
    });

    return setData(recData);
  };

  useEffect(() => {
    submitSearchHandler();
  }, []);

  return (
    <div className="app__moviesearch flex__center">
      <Container>
        <div className="app__moviesearch-container flex__center">
          <div className="app__moviesearch-header">
            <h1>Search results for {movie} :</h1>
          </div>

          <div className="app__moviesearch-content">
            {searchResults.length > 0 && <RowItemSlider data={searchResults} />}
          </div>
        </div>
      </Container>
    </div>
  );
}
