const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const csv = require("csv-parser");

const getSearchedMovie = async (searchQuery) => {
  const queryWord = String(String(searchQuery.name).toLowerCase());

  let searchResults = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "..", "data", "movies_metadata.csv")
    )
      .pipe(csv())
      .on("data", function (row) {
        const title = String(row.original_title).toLowerCase();

        if (title.includes(queryWord)) {
          searchResults.push(row);
        }
      })
      .on("end", function () {
        console.log("end of searching");
        resolve(searchResults);
        // TODO: SAVE users data to another file
      });
  });
  //   searchMoviesPromise.then(() => {
  //     return searchResults;
  //   });
};

module.exports = {
  getSearchedMovie,
};
