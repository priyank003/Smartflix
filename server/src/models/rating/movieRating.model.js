const CSVToJSON = require("csvtojson");
const fs = require("fs");
const { parse } = require("csv-parse");

const userRatings = require("../../../users");

Array(userRatings);

const result = [userRatings];

// result[0].default.map((item) => {
//   console.log(item);
// });
const arrayToObject = (arr) => {
  const res = {};

  let userKeyObj = arr[0].default[0].userId;
  let movieKeyObj = arr[0].default[0].movieId;

  res[userKeyObj] = {};

  res[userKeyObj][movieKeyObj] = Number(arr[0].default[0].rating);

  for (let i = 1; i < arr[0].default.length; i++) {
    movieKeyObj = arr[0].default[i].movieId;
    if (arr[0].default[i].userId === userKeyObj) {
      res[userKeyObj][movieKeyObj] = Number(arr[0].default[0].rating);
    } else {
      userKeyObj = arr[0].default[i].userId;
      res[userKeyObj] = {};
      res[userKeyObj][movieKeyObj] = Number(arr[0].default[0].rating);
    }
  }
  return res;
};

const finalData = arrayToObject(result);

// fs.createReadStream("./data/ratings.csv")
//   .pipe(
//     parse({
//       comment: "#",
//       columns: true,
//     })
//   )
//   .on("data", async (data) => {
//     results.push(data);
//   })
//   .on("error", (err) => {
//     console.log(err);
//   })
//   .on("end", async () => {
//     console.log("done");
//   });

//parse();

// const arrayToObject = (arr) => {
//  console.log(arr)
// };
// arrayToObject(userRatings);

// CSVToJSON()
//   .fromFile("./data/ratings.csv")
//   .then((users) => {
//     // users is a JSON array
//     // log the JSON array

//     fs.writeFile("users.json", JSON.stringify(users, null, 4), (err) => {
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

module.exports.default = finalData;
