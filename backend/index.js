const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const readline = require('readline');
const database = require('./database.js');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// allow cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// get all species
app.get('/species', (req, res) => {
  database.getSpecies((result) => {
    res.json(result);
  });
});

// get all sightings
app.get('/sightings', (req, res) => {
  database.getSightings((result) => {
    res.json(result);
  });
});

// post new sighting
app.post('/sightings', (req, res) => {
  const data = req.body;
  const species = data.species;
  const description = data.description;
  const dateTime = data.dateTime;
  const count = data.count;
  const latitude = (data.latitude !== undefined) ? data.latitude : null;
  const longitude = (data.longitude !== undefined) ? data.longitude : null;
  database.insertSighting(species, description, dateTime, count, latitude, longitude, (result) => {
    res.json({ id: result });
  });
});

// start the server
const port = process.env.port || 8080;
const server = app.listen(port, () => {
  console.log(`Listening to port #${port}`);
});

// for listening to interruption signals
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// make SIGINT work on both windows and linux with the readline module
rl.on('SIGINT', () => {
  process.emit('SIGINT');
});
// Catch interrupt signal(CTRL+C)
process.on('SIGINT', () => {
  console.log('\nCaught interrupt signal');
  database.closeDatabase(() => {
    server.close(() => {
      console.log("Server closed");
      process.exit();
    });
  });
});