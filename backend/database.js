const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('duckhunt.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the DuckHunt database.');
  return null;
});

function closeDatabase(callback) {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Database connection closed.');
    callback();
  });
}

function getSpecies(callback) {
  db.all('SELECT name FROM Species', [], (err, rows) => {
    if (err) console.error(err);
    callback(rows);
  });
}

function getSightings(callback) {
  db.all(`SELECT id, species, description, dateTime, count, latitude, longitude FROM Sightings`, [], (err, rows) => {
    if (err) console.log(err);
    callback(rows);
  });
}

function insertSighting(species, description, dateTime, count, latitude, longitude, callback) {
  db.run(`INSERT INTO Sightings(species, description, dateTime, count, latitude, longitude)
    VALUES(?, ?, ?, ?, ?, ?)`, [species, description, dateTime, count, latitude, longitude], (err) => {
      if (err) console.log(err);
      callback(this.lastID);
  });
}

module.exports = {
  closeDatabase,
  getSpecies,
  getSightings,
  insertSighting,
}