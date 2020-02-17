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
}).parse();


async function getCharacters(pageNumber) {
  const results = await axios({
    method: 'get',
    url: `https://rickandmortyapi.com/api/character/?page=${pageNumber}`,
  });
  console.log(results);
  return results;
};



function getAllCharacters() {
  let bufferData = [];
  let promises = [];
  for (let i = 0; i <= 2; i++) {
    promises.push(getCharacters(i));
  };

Promise.all(promises).then((content) => {
   bufferData.push(...content); 
  // or use flatMap()
  writeCharacters(content);
}).catch(err => {
  console.log(err);
});
console.log(bufferData);
return bufferData;
}


/* async function getAllCharacters() {
  const arr = [];
  for (let i = 1; i < 3; i++) {
    const content = await getCharacters(i);
    const characters = content.data.results;
    arr.push(...characters);
    //characters.forEach(character => {
    //  arr.push(character);
    // });
  };
  return arr;
}; */


function writeCharacters(content) {
  fs.writeFileSync(notePath, JSON.stringify(content));
};

async function search(args) {
  for (var key in args) {
    if (key === '_' || key === '$0') {
      delete args[key];
    }
  };

  let characters = await getAllCharacters();
  for (var key in args) {
    characters = characters.filter(character => character[key] === args[key]);
  }
  if (characters.length) {
    console.log(`There are ${characters.length} matches`);
  } else {
    console.log('No characters matches!');
  }
 // writeCharacters(characters);
};

