const fetch = require("node-fetch");

const getData = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    // console.log(`USERS CHOICE 1 IS -- ${user.movieChoice1}`);
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getData
