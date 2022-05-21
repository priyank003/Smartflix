const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const { rejects } = require("assert");
const CSVToJSON = require("csvtojson");
const link = require("./links.mongo");

let moviesData = [];

function loadMovieLinksDataFile() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "links.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        moviesData.push(data);
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", () => {
        saveData(moviesData);
        resolve();
      });
  });
}

// CSVToJSON()
//   .fromFile("./data/links.csv")
//   .then((links) => {
//     // users is a JSON array
//     // log the JSON array

//     fs.writeFile("links.json", JSON.stringify(links, null, 4), (err) => {
//       if (err) {
//         throw err;
//       }
//       console.log("JSON array is saved.");
//     });
//   })
//   .catch((err) => {
//     // log error if any
//     console.log(err);
//   });

const saveData = async (data) => {
  try {
    await link.create(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  loadMovieLinksDataFile,
};
