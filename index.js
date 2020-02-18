/* eslint-disable require-jsdoc */
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const notePath = path.join(__dirname, 'notes.json');
const yargs = require('yargs');

yargs.command({
  command: 'search',
  describe: 'searching',
  builder: {
    name: {
      type: 'string',
      demandOption: false,
      description: 'name',
    },
    id: {
      type: 'number',
      demandOption: false,
      description: 'id',
    },
    status: {
      type: 'string',
      demandOption: false,
      description: 'status',
    },
    species: {
      type: 'string',
      demandOption: false,
      description: 'species',
    },
    gender: {
      type: 'string',
      demandOption: false,
      description: 'gender',
    },
  },
  handler(args) {
    search(args);
  },
})
    .demandCommand(1, 'You need at least one command before moving on')
    .argv;

async function getCharacters(pageNumber) {
  const content = await axios({
    method: 'get',
    url: `https://rickandmortyapi.com/api/character/?page=${pageNumber}`,
  });
  return content.data.results;
};

async function getPagesNumber() {
  const content = await axios({
    method: 'get',
    url: `https://rickandmortyapi.com/api/character/`,
  });
  return content.data.info.pages;
};

async function getAllCharacters() {
  const pagesNumber = await getPagesNumber();
  const promises = [];
  for (let i = 1; i <= pagesNumber; i++) {
    promises.push(getCharacters(i));
  };
  const data = await Promise.all(promises).then((data) => data.flat());
  console.log(`There are ${data.length} results`);
  return data;
};

function writeCharacters(content) {
  fs.writeFileSync(notePath, JSON.stringify(content));
};

async function search(args) {
  let characters = await getAllCharacters();
  for (const key in args) {
    if (key !== '_' && key !== '$0') {
      characters = characters.filter(
          (character) => character[key] === args[key]);
    }
  }
  showMatches(characters);
  writeCharacters(characters);
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
