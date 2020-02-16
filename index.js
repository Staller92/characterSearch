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
    console.log(args);
    search(args.name, args.species, args.status, args.gender );
  },
}).parse();


async function getCharacters(pageNumber) {
  const results = await axios({
    method: 'get',
    url: `https://rickandmortyapi.com/api/location?page=${pageNumber}`,
  });
  return results;
};


async function getAllCharacters() {
  const arr = [];
  for (let i = 1; i < 5; i++) {
    const content = await getCharacters(i);
    const characters = content.data.results;
    arr.push(...characters);
    //characters.forEach(character => {
    //  arr.push(character);
    // });
  };
  writeCharacters(arr);
  return arr;
};


function writeCharacters(content) {
  fs.writeFileSync(notePath, JSON.stringify(content));
};



async function search(name, species, status) {
  console.log(name);
  console.log(species);
  console.log(status);
  const characters = await getAllCharacters();
  const filtered = characters.filter(character => character.name === name && character.species === species && character.status === status);
  console.log(filtered);
};

