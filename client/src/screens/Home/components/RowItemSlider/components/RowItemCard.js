import React, { useEffect } from "react";

import "./RowItemCard.css";

export default function RowItemCard({ img, name }) {
  // useEffect(() => {
  //   const fetchRes = async () => {
  //     const res = fetch(
  //       "https://image.tmdb.org/t/p/w500/hOhjRNpkqttyQkMMJubFzjcjqxQ.jpg",
  //       {
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       }
  //     );

  //     console.log("in row cards", await res);
  //   };
  //   fetchRes();
  // }, []);
  function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good;
    img.onerror = bad;
    img.src = imageSrc;
  }

  checkImage(
    img,
    function () {
      console.log(`good ${name}`);
    },
    function () {
      console.log(`bad ${name}`);
    }
  );

  return (
    <div className="rowitemcard__container">
      <div className="rowitemcard__img">
        <img src={`https://image.tmdb.org/t/p/w500${img}`} alt={name} />
      </div>
      {/* <div className="rowitemcard__name">
        <p>{name}</p>
      </div> */}
      <div className="rowitemcard__overlay"></div>
    </div>
  );
}
