import React from "react";
import { Container } from "react-bootstrap";

import "./Landing.css";

export default function Landing() {
  return (
    <div className="home__landing flex__center">
      <div className="home__landing-overlay overlay"></div>
      <Container className="home__landing-container">
        <div className="home__landing-hero">
          <p className="text__subtitle landing__hero-top">Welcome to Netflix</p>
          <h1 className="header__one">Download Unlimited</h1>
          <h1 className="header__one">Movies, Drama, Music</h1>
          <h1 className="header__one">Video and More Content.</h1>

          <p className="text__subtitle landing__hero-bottom">
            Enjoy exclusive Music Video popular movies and Live shows. Subscribe
            BD Screen now{" "}
          </p>
          <div className="home__landing-nav ">
            <div className="home__landing-nav-left">
              <div className="home__landing-nav-phcode flex__center col-2">
                +880
              </div>
              {/* <span></span> */}
              <input
                className="home__landing-nav-phno col-5"
                placeholder="Enter mobie number"
              ></input>
            </div>
            <a href="#" className="flex__center nav__submit-link ">
              Subscribe
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
