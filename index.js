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
  close,
  listen
};