const db = require('./usersDBRef');
const users = require('./userTourHash.json');

async function initializeUsers(){
  try{
    let numberRemoved = await db.remove({}, {multi: true});
    console.log('Removed ' + numberRemoved + ' users...');

    let newUsers = await db.insert(users);
    console.log('Added ' + newUsers + ' users');
  }
  catch(err){
    console.log(err);
  }
}

initializeUsers();
