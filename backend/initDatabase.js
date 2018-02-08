const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('duckhunt.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the DuckHunt database.');
  return null;
});

function closeDatabase() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Database connection closed.');
  });
}

// first species
const initialSpeciesData = [{"name":"mallard"},{"name":"redhead"},{"name":"gadwall"},{"name":"canvasback"},{"name":"lesser scaup"}];

// first ducks to init table
const initialDuckData = [
  {"id":"1","species":"gadwall","description":"All your ducks are belong to us","dateTime":"2016-10-01T01:01:00Z","count":1},
  {"id":"2","species":"lesser scaup","description":"This is awesome","dateTime":"2016-12-13T12:05:00Z","count":5},
  {"id":"3","species":"canvasback","description":"...","dateTime":"2016-11-30T23:59:00Z","count":2},
  {"id":"4","species":"mallard","description":"Getting tired","dateTime":"2016-11-29T00:00:00Z","count":18},
  {"id":"5","species":"redhead","description":"I think this one is called Alfred J.","dateTime":"2016-11-29T10:00:01Z","count":1},
  {"id":"6","species":"redhead","description":"If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.","dateTime":"2016-12-01T13:59:00Z","count":1},
  {"id":"7","species":"mallard","description":"Too many ducks to be counted","dateTime":"2016-12-12T12:12:12Z","count":100},
  {"id":"8","species":"canvasback","description":"KWAAK!!!1","dateTime":"2016-12-11T01:01:00Z","count":5}
];

db.serialize(() => {
  // Create table for species
  db.run(`CREATE TABLE IF NOT EXISTS Species(
    name VARCHAR(20) PRIMARY KEY
  );`, [], (err) => {
    if (err) console.error(err);
    else console.log("Species table created");
  });
  // drop table so no dublicate data will be inserted
  db.run(`DROP TABLE Sightings`, [], (err) => {
    if (err) console.error(err);
    else console.log("Sightings table dropped");
  });
  // Create table for sightings
  db.run(`CREATE TABLE Sightings(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    species VARCHAR(20) NOT NULL,
    description TEXT DEFAULT "", 
    dateTime VARCHAR(25) NOT NULL,
    count INT NOT NULL,
    location VARCHAR(13),
    FOREIGN KEY(species) REFERENCES Species(name)
  );`, [], (err) => {
    if (err) console.error(err);
    else console.log("Sightings table created");
  });

  // fill species to the table
  initialSpeciesData.forEach((speciesData) => {
    db.run(`INSERT INTO Species (name) VALUES (?)`, [speciesData.name], (err) => {
      if (err) console.error(err);
    });
  });
  // fill sightings to the table
  initialDuckData.forEach((sightingData) => {
    db.run(`INSERT INTO Sightings (species, description, dateTime, count, location) VALUES (?, ?, ?, ?, NULL)`, 
      [sightingData.species, sightingData.description, sightingData.dateTime, sightingData.count], (err) => {
        if (err) console.error(err);
    });
  });
});

closeDatabase();