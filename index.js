const axios = require('axios');
axios
  .get("https://rickandmortyapi.com/api/character/?page=19")
  .then(response => console.log(response.data))
  .catch(error => console.log(error));