import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import loadImg from "../../../../../assets/Home/catalogue/download.jfif";
import { getImageData } from "../../../../../Api/Api";
import "./RowItemCard.css";

export default function RowItemCard({ id, name }) {
  const [imgSrc, setImgSrc] = useState();
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
  // function checkImage(imageSrc, good, bad) {
  //   var img = new Image();
  //   img.onload = good;
  //   img.onerror = bad;
  //   img.src = imageSrc;
  // }

  // checkImage(
  //   img,
  //   function () {
  //     console.log(`good ${name}`);
  //   },
  //   function () {
  //     console.log(`bad ${name}`);
  //   }
  // );

  useEffect(() => {
    const fetchImg = async () => {
      const movieData = await getImageData(id);

      if (movieData.movie_results.length > 0) {
        setImgSrc(
          (prev) =>
            (prev = `https://image.tmdb.org/t/p/w500/${movieData.movie_results[0].poster_path}`)
        );
      }
    };

    fetchImg();
  }, [id, name]);

  return (
    <React.Fragment>
      {typeof imgSrc !== undefined ? (
        <div
          className="rowitemcard__container"
          // style={{
          //   display: `${typeof imgSrc === "undefined" ? "none" : "block"}`,
          // }}
        >
          <div className="rowitemcard__img">
            <LazyLoadImage
              effect="blur"
              src={imgSrc}
              alt={name}
              width="250px"
              height="300px"
              placeholderSrc={loadImg}
            />
          </div>
          <div className="rowitemcard__overlay"></div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
