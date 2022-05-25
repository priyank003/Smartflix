import "./App.css";
import Home from "./screens/Home/Home";
import Navbar from "./shared/Navbar/Navbar";
import Signin from "./screens/Signin/Signin";
import { Routes, Route } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
