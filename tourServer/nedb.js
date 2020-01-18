// Create a NeDB datastore for users with hashed passwords
//
// Remove the file usersDB before running this example
//
const DataStore = require('nedb');
const db = new DataStore({ filename: __dirname + '/usersDB', autoload: true });

const users = require('./userTourHash.json');

db.insert(users, function (err, newDocs) {
  if (err) {
    console.log("Something went wrong when writing");
    console.log(err);
  } else {
    console.log("Added " + newDocs.length + " users");
  }
});




