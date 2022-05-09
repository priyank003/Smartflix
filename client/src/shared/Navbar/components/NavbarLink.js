import React from "react";
import "./NavbarLink.css";

export default function NavbarLink({ Icon, name }) {
  return (
    <div className="link__container">
      <div className="link__icon flex__center">{Icon}</div>
      <div className="link__name flex__center">{name}</div>
    </div>
  );
}
