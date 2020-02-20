/* eslint-disable require-jsdoc */
const yargs = require('yargs');
const service = require('./app/service');

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
    const arrayOfValidParams = ['name', 'id', 'status', 'species', 'gender'];
    const validParams = Object.entries(args)
        .filter((param) => arrayOfValidParams.includes(param[0]));
    service.search(validParams);
  },
})
    .demandCommand(1, 'You need at least one command before moving on')
    .argv;
