const fs = require('fs');
const bcrypt = require('bcryptjs');

const users = require('./userTours.json');

let nRounds = 10;
let hashedUsers = [];
let start = new Date();
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);


// Your code here to process the passworkds
users.map((tour) => {
  let hash = bcrypt.hashSync(tour.password, nRounds);
  tour.password = hash;
  const email = tour.email;
  hashedUsers.push({
    firstName: tour.firstName, lastName: tour.lastName, email: tour.email,
    password: tour.password, role: tour.role
  });
});


let elapsed = new Date() - start;
console.log(`Finished password hashing, ${elapsed / 1000} seconds.`);
fs.writeFileSync("userTourHash.json", JSON.stringify(hashedUsers, null, 2));
