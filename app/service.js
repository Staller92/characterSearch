/* eslint-disable require-jsdoc */
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const notePath = path.join(__dirname, '../data/notes.json');

async function getCharacters(pageNumber) {
  const content = await axios({
    method: 'get',
    url: `https://rickandmortyapi.com/api/character/?page=${pageNumber}`,
  });
  return content.data.results;
};

async function initialRequest() {
  const content = await axios({
    method: 'get',
    url: `https://rickandmortyapi.com/api/character/`,
  });
  return [content.data.info.pages, content.data.results];
};

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

function writeCharacters(content) {
  return fs.writeFileSync(notePath, JSON.stringify(content));
};

async function search(args) {
  let characters = await getAllCharacters();
  characters = characters.filter(filterPredicate(args));
  showMatches(characters);
  writeCharacters(characters);
};

function filterPredicate(args) {
  return (element) => args.every((arg) => element[arg[0]] === arg[1]);
};

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
