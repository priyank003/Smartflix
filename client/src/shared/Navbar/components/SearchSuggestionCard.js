import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./SearchSuggestionCard.css";
import { useSelector, useDispatch } from "react-redux";
import { searchInfoActions } from "../../../store/movieSearch-slice";

export default function SearchSuggestionCard({ data }) {
  const dispatch = useDispatch();

  const searchSubmitHandler = () => {
    dispatch.searchInfoActions.exactMovieTitle(data.original_title);
  };
  return (
    <div className="search__suggestion-container ">
      <p className="flex__center">{data.original_title}</p>
      <Link to={`/similar-results/${data.original_title}`}>
        <p
          className="search__suggestion-similar results__link"
          onClick={searchSubmitHandler}
        >
          similar movies
        </p>
      </Link>
    </div>
  );
}
