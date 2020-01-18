var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var cookieParser = require('cookie-parser');

let tourDB = require('./tourDBRef');
let userDB = require('./usersDBRef');

var app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());


const cookieName = "ab4489toursid";
app.use(session({
  secret: 'rohan kumar',
  resave: false,
  saveUninitialized: false,
  name: cookieName
}));

app.use(function (req, res, next) {
  console.log(`session object: ${JSON.stringify(req.session.user)}`);
  console.log(`session id: ${req.session.id}`);
  if (!req.session.user) {
    req.session.user = { role: "guest" };
  }
  next();
});


var getTours = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var toursData = await tourDB.find({});
  res.json(toursData);
  res.status(200);
}

var getTourByID = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var tourID = req.params.id;
  console.log(tourID);
  var tour = await tourDB.find({ "_id": tourID });
  if (typeof (tour) != "undefined" && tour.length > 0) {
    res.status(200).json(tour);
  }
  else {
    res.status(404).json("Tour not found...");
  }
}

var getNumberOfTours = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var toursData = await tourDB.find({});
  res.json(toursData.length);
}

var addTours = async function (req, res) {
  let tour = req.body;
  try {
    await tourDB.insert(tour);
    let tours = await tourDB.find({});
    res.status(200).json(tours);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.status(404).json({ error: "error with add tour" });
  }

}

var deleteTourByID = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var tourID = req.params.id;
  console.log(tourID);
  var deletedTour = await tourDB.remove({ _id: tourID }, {});
  console.log("Deleted Tour : ", deletedTour);
  if (deletedTour > 0) {
    res.status(200).json("Tour deleted successfully...");
  }
  else {
    res.status(404).json("Tour not deleted...");
  }
}

var doLogin = async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  // Find user
  let user = await userDB.findOne({ email: email });
  console.log(`in Login, user: ${JSON.stringify(user)}`);
  if (!user) {
    res.status(401).json({
      error: true,
      message: "User not found!! error!!"
    });
    return;
  }
  let verified = bcrypt.compareSync(password, user.password);
  if (verified) {
    let newUserInfo = Object.assign({}, user);
    delete newUserInfo.password;
    let oldInfo = req.session.user;
    req.session.regenerate(function (err) {
      if (err) {
        console.log(err);
      }
      req.session.user = Object.assign(oldInfo, newUserInfo);
      res.json(newUserInfo);
    });
  } else {
    res.status(401).json({
      error: true,
      message: "User/Password error"
    });
  }
}

var doLogout = function (req, res) {
  let options = req.session.cookie;
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.clearCookie(cookieName, options);
    res.json({ message: 'GoodBye' });
  });
}

var checkAdmin = function (req, res, next) {
  var err = { "error": "Not Permitted" };
  if (req.session.user.role !== 'admin') {
    var errString = "StatusCodeError: 401 - " + JSON.stringify(err);
    res.status(401).json(errString);
  }
  else {
    next();
  }
}

var checkCustomer = function (req, res, next) {
  var err = { "error": "Not Permitted" };
  if (req.session.user.role !== 'customer') {
    var errString = "StatusCodeError: 401 - " + JSON.stringify(err);
    res.json(errString);
  }
  else {
    next();
  }
}
app.get('/tours', getTours);
app.post('/login', express.json(), doLogin);
app.get('/tours/:id', getTourByID);
app.get('/count/tour', getNumberOfTours);
app.post('/tours/add', checkAdmin, addTours);
app.delete('/tours/delete/:id', checkAdmin, deleteTourByID);
app.get('/logout', doLogout);


app.listen(3000, function () {
  console.log(`TourServer listening on IPv4:`);
});
