import regressionRec from "./rec.mongo";
import contentRec from "./content.mongo";
import collabItemRec from "./itembased.mongo";
import collabUserRec from "./userbased.mongo";
import axios from "axios";

const AddRegressionMovies = async (userId, strategy, data) => {
  // getDataWithImage(data);
  try {
    await regressionRec.updateOne(
      {
        id: userId,
      },
      {
        [strategy]: data,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`Could not recommend movie ${err}`);
  }
};

const AddContentBasedMovies = async (userId, strategy, data) => {
  // // getDataWithImage(data);

  // console.log("before mongo update");

  // const modifiedData = data.map(async (movie) => {
  //   return await getImageData(movie.imdbId).then((res) => (movie.poster = res));
  // });

  try {
    await contentRec.updateOne(
      {
        id: userId,
      },
      {
        contentBased: data,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`Could not recommend movie ${err}`);
  }
};

const AdduserBasedMovies = async (userId, strategy, data) => {
  try {
    await collabUserRec.updateOne(
      {
        id: userId,
      },
      {
        collabUserBased: data,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`Could not recommend movie ${err}`);
  }
};

const AdditemBasedMovies = async (userId, strategy, data) => {
  try {
    await collabItemRec.updateOne(
      {
        id: userId,
      },
      {
        collabItemBased: data,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`Could not recommend movie ${err}`);
  }
};

const getImageData = async (id) => {
  try {
    const imgRes = await axios.get(
      `https://api.themoviedb.org/3/find/${id}?api_key=ab414ecaafc012ffce4c584b0924aa87&language=en-US&external_source=imdb_id`
    );

    return await imgRes.data.movie_results[0].poster_path;
  } catch (err) {
    console.log(err);
  }
};

async function getDataWithImage(data) {
  const modifiedData = data.map((movie) => {
    getImageData(movie.imdbId).then((res) => (movie.poster = res));
  });

  console.log(modifiedData);
}

// const getDataWithImage = async (data) => {
//   data.map(async (movie) => {
//     const imgRes = await axios.get(
//       `https://api.themoviedb.org/3/find/${movie.imdbId}?api_key=ab414ecaafc012ffce4c584b0924aa87&language=en-US&external_source=imdb_id`
//     );

//     movie.poster = await imgRes.data.movie_results[0].poster_path;
//   });

//   console.log("in image function", data);

//   return data;
// };

module.exports = {
  AddRegressionMovies,
  AddContentBasedMovies,
  AdditemBasedMovies,
  AdduserBasedMovies,
};
