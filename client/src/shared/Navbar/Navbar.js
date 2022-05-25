import React, { useState } from "react";
import brandLogo from "../../assets/navbar/logo.png";
import { Dropdown } from "react-bootstrap";
import NavbarLink from "./components/NavbarLink";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { loggedInActions } from "../../store/loginAuth-slice";
import { userInfoActions } from "../../store/userInfo-slice";

import HomeIcon from "@mui/icons-material/Home";
import TheatersIcon from "@mui/icons-material/Theaters";
// import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AirplayIcon from "@mui/icons-material/Airplay";
import SearchIcon from "@mui/icons-material/Search";
import { v4 as uuidv4 } from "uuid";
import "./Navbar.css";
import TheaterComedy from "@mui/icons-material/TheaterComedy";

const NAV_LINKS = [
  {
    icon: <HomeIcon />,
    name: "Home",
  },
  {
    icon: <TheatersIcon />,
    name: "Movie",
  },
  {
    icon: <TheaterComedy />,
    name: "Drama",
  },
  {
    icon: <MusicVideoIcon />,
    name: "Music Video",
  },
  {
    icon: <LiveTvIcon />,
    name: "Live Show",
  },
  {
    icon: <AirplayIcon />,
    name: "Comedies",
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const loggedInstate = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const userInfo = useSelector((state) => {
    return {
      email: state.userInfo.email,
      name: state.userInfo.name,
    };
  });

  const BASE_URL = "http://localhost:8000/auth/logout";

  const logOutHandler = async () => {
    await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        email: userInfo.email,
        isLoggedIn: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(navigate("/"))
      .then(dispatch(loggedInActions.setLoginState(false)));
    dispatch(
      userInfoActions.setUserInfoState({
        email: "",
        name: "",
      })
    );
  };

  return (
    <div
      className="app__navbar-container flex__center"
      style={{ background: isScrolled ? "rgb(10, 7, 11)" : "transparent" }}
    >
      <nav className="app__navbar">
        <div className="app__navbar-left row-xl ">
          <div className="app__navbar-brand ">
            <img src={brandLogo} alt="netflix" />
          </div>
          <Dropdown className="mx-2 nav__dropdown">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              Browse
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div className="app__navbar-links col-12 col-xl-8">
                {NAV_LINKS.map((link) => {
                  return (
                    <Dropdown.Item href="#" key={uuidv4()}>
                      <NavbarLink Icon={link.icon} name={link.name} />
                    </Dropdown.Item>
                  );
                })}
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <div className="app__navbar-links col-12 col-xl-8">
            {NAV_LINKS.map((link) => {
              return (
                <NavbarLink key={uuidv4()} Icon={link.icon} name={link.name} />
              );
            })}
          </div>
        </div>
        <div className="app__navbar-right">
          <div className="app__navbar-search">
            <SearchIcon />
          </div>
          {loggedInstate ? (
            <div className="app__navbar-user-login-info">
              {" "}
              <p className="app__navbar-username"> {userInfo.name}</p>
              <Link to="/" onClick={logOutHandler}>
                {" "}
                <div className="app__navbar-auth">Logout</div>
              </Link>
            </div>
          ) : (
            <Link to="/signin">
              {" "}
              <div className="app__navbar-auth">Login</div>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
