const Express = require('express');
const axios = require('axios');

const App = Express();
const PORT = 3001;

// Routes
App.get('/', (req, res) => res.send('Growth Interview'));

App.get('/people', (req, res) => {
  const sortBy = req.params.sortBy || null;
  const result = [];
  res.send('people')
});

App.get('/planets', (req, res) => {
  const result = [];
  res.send('planets')
});

App.listen(PORT, () => console.log(`listening on port: ${PORT}`));


// API Functions
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
  sort,
  close,
  listen
};