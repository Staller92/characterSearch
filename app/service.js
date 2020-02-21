const axios = require('axios');
const fs = require('fs');
const path = require('path');
const notePath = path.join(__dirname, '../data/notes.json');

/**
 *
 * Function executes request to API and retrives data with characters
 * @param {number} pageNumber
 * @return {Array}  Array of objects of character
 *
 */
async function getCharacters(pageNumber) {
  const content = await axios({
    method: 'get',
    url: `https://rickandmortyapi.com/api/character/?page=${pageNumber}`,
  });
  return content.data.results;
};

/**
 *
 * Function executes initial request to API and retrives
 * data and amount of pages
 * @return {Array} Array of data and amount of pages
 */
async function initialRequest() {
  const content = await axios({
    method: 'get',
    url: `https://rickandmortyapi.com/api/character/`,
  });
  return [content.data.info.pages, content.data.results];
};

/**
 *
 * Function retrives all characters
 * @return {Array} Array of all objects of character
 */
async function getAllCharacters() {
  const init = await initialRequest();
  const promises = [];
  for (let i = 2; i <= init[0]; i++) {
    promises.push(getCharacters(i));
  };
  const data = await Promise.all(promises);
  data.push(init[1]);
  const flatData = data.flat();
  console.log(`There are ${flatData.length} results`);
  return flatData;
};

/**
 *
 * Function writes notes in json file
 * @param {Object} content
 * @return {void}
 */
function writeCharacters(content) {
  return fs.writeFileSync(notePath, JSON.stringify(content));
};

/**
 *
 * Function performs search of a character based on
 * the search parameters passed in the command line
 * @param {Array} args  command line params
 */
async function search(args) {
  let characters = await getAllCharacters();
  characters = characters.filter(filterPredicate(args));
  showMatches(characters);
  writeCharacters(characters);
};

/**
 *
 *
 * @param {Array} args command line params
 * @return {Function} predicate function for filter
 */
function filterPredicate(args) {
  return (element) => args.every((arg) => element[arg[0]] === arg[1]);
};

/**
 *
 * Function logs 5 first results
 * @param {Array} data Array of finded objects
 */
function showMatches(data) {
  if (data.length) {
    console.log(`There are ${data.length} matches`);
    for (let i = 0; i < 5; i++) {
      data[i] && console.log(data[i]);
    }
  } else {
    console.log('No characters matches!');
  }
};

module.exports = {
  search,
};
