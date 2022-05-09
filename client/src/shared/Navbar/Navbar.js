import React from "react";
import brandLogo from "../../assets/navbar/logo.png";
import { Container, Dropdown } from "react-bootstrap";
import NavbarLink from "./components/NavbarLink";

import HomeIcon from "@mui/icons-material/Home";
import TheatersIcon from "@mui/icons-material/Theaters";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AirplayIcon from "@mui/icons-material/Airplay";
import SearchIcon from "@mui/icons-material/Search";

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
  return (
    <div className="app__navbar-container flex__center">
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
                    <Dropdown.Item href="#">
                      <NavbarLink Icon={link.icon} name={link.name} />
                    </Dropdown.Item>
                  );
                })}
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <div className="app__navbar-links col-12 col-xl-8">
            {NAV_LINKS.map((link) => {
              return <NavbarLink Icon={link.icon} name={link.name} />;
            })}
          </div>
        </div>
        <div className="app__navbar-right">
          <div className="app__navbar-search">
            <SearchIcon />
          </div>
          <div className="app__navbar-auth">Login</div>
        </div>
      </nav>
    </div>
  );
}
