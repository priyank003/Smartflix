import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import RowItemSlider from "../Home/components/RowItemSlider/RowItemSlider";
export default function SimilarMovies() {
  const { movie } = useParams();

  const userId = useSelector((state) => {
    return state.userInfo.userId;
  });

  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const postSimilarMovie = async () => {
      const movieRes = await fetch(
        "http://localhost:9000/search/recommendation",
        {
          method: "POST",
          body: JSON.stringify({
            user_id: userId,
            title: movie,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const similarMovieData = await movieRes.json();

      setSimilarMovies(similarMovieData.movie_results);
    };

    postSimilarMovie();
  }, []);

  console.log(similarMovies);
  return (
    <div className="app__moviesearch flex__center">
      <Container>
        <div className="app__moviesearch-container flex__center">
          <div className="app__moviesearch-header">
            <h1>Search results for {movie} :</h1>
          </div>

          <div className="app__moviesearch-content">
            {similarMovies.length > 0 && <RowItemSlider data={similarMovies} />}
          </div>
        </div>
      </Container>
    </div>
  );
}
