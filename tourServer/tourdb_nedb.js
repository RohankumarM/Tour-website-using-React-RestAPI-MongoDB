const DataStore = require('nedb');
const db = new DataStore({ filename: __dirname + '/tourDB', autoload: true });

const users = require('./tours.json');

db.insert(users, function (err, newDocs) {
  if (err) {
    console.log("Something went wrong when writing");
    console.log(err);
  } else {
    console.log("Added " + newDocs.length + " users");
  }
});
