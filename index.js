const Express = require('express');
const axios = require('axios');

const App = Express();
const PORT = 3001;

let peopleCache = [],
    indexedPeople = {},
    result = [];

// Populate cache on initialization
getPeople();

// Routes
App.get('/', (req, res) => res.send('Growth Interview'));

App.get('/people/:sortBy?', async (req, res) => {
  const sortBy = req.params.sortBy || null;
  if (sortBy) {
    if (sortBy !== 'name' &&
      sortBy !== 'mass' &&
      sortBy !== 'height'
    ) return res.json({message:'invalid sort parameter'})
  }
  let result = await sendPeople(sortBy);
  res.json(result)
});

App.get('/planets', (req, res) => {
  const result = [];
  res.send('planets')
});

App.listen(PORT, () => console.log(`listening on port: ${PORT}`));


// API Functions

async function getPeople(page = 1, result = []) {
  try {
    let {data} = await axios.get(`https://swapi.co/api/people/?page=${page}`);
    data.results.forEach(person => result.push(person));
    if (data.next !== null) {
      page++;
      return await getPeople(page, result)
    } else {
      peopleCache = result;
      console.log("cache is populated")
    }
    indexedPeople = result.reduce(function (acc, next, i) {
      acc[i + 1] = next.name;
      return acc;
    }, {});
    return result;
  } catch (e) {
    console.log(e)
  }
}

async function sendPeople(sortBy, result = [], page = 1) {
  if (peopleCache.length) {
    return sort(peopleCache, sortBy)
  } else {
    try{
      let {data} = await axios.get(`https://swapi.co/api/people/?page=${page}`);
      data.results.forEach(person => result.push(person));
      if (data.next !== null) {
        page++;
        return await sendPeople(sortBy, result, page);
      } else {
        peopleCache = result;
        return sort(result, sortBy)
      }
    } catch (e) {
      console.log(e)
    }
  }
}

function sort(people, attribute) {
  switch (attribute) {
    case 'name':
      return people.sort(function(a, b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
      break;
    case 'height':
      return people.sort((a, b) => {
        return b.height - a.height;
      });
      break;
    case 'mass':
      const unknownMass = [],
        result = [];
      people.forEach(person => {
        if (person.mass === 'unknown') {
          unknownMass.push(person);
        } else {
          result.push(person);
        }
      });
      return result.sort((a, b) => {
        return b.mass - a.mass;
      }).concat(unknownMass);
      break;
    default:
      return people;
  }
}


// Testing Functions
httpServer = require('http').createServer(App);

// close destroys the server.
function close() {
  httpServer.close();
}
function listen (port) {
  console.log('Listening on: ' + port);
  httpServer.listen(port);
}

module.exports = {
  sendPeople,
  getPeople,
  sort,
  close,
  listen
};