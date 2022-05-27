import "./App.css";
import Home from "./screens/Home/Home";
import Navbar from "./shared/Navbar/Navbar";
import Signin from "./screens/Signin/Signin";
import MovieSearch from "./screens/MovieSearch/MovieSearch";
import SimilarMovies from "./screens/MovieSearch/SimilarMovies";
import { Routes, Route } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/search/:movie" element={<MovieSearch />} />
        <Route path="/similar-results/:movie" element={<SimilarMovies />} />
      </Routes>
    </div>
  );
}

export default App;
