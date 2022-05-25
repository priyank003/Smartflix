import regressionRec from "./rec.mongo";
import contentRec from "./content.mongo";
import collabItemRec from "./itembased.mongo";
import collabUserRec from "./userbased.mongo";
const AddRegressionMovies = async (userId, strategy, data) => {
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
module.exports = {
  AddRegressionMovies,
  AddContentBasedMovies,
  AdditemBasedMovies,
  AdduserBasedMovies,
};
