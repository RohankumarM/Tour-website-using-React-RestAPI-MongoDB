var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const fs = require('fs');
const neDB = require('nedb');
const db = new neDB({ filename: 'tourDB', autoload: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/tours/add', function (req, res) {
  var data = req.body;
  var tour_name = req.body.name;
  var tour_city = req.body.city;
  var tour_date = req.body.date;
  var i = 5;
  console.log("Tour " + i, "Name: ", tour_name, ", City: ", tour_city, ", Date: ", tour_date);
  var newData = { "id": i, "name": tour_name, "city": tour_city, "date": tour_date };
  // var contents = fs.readFileSync('../tourServer/tours.json');
  db.insert(newData);

  // var jsonContent = JSON.parse(contents);
  // jsonContent.push(data);
  i = i + 1;
  res.end("yes");
});

host = '127.0.0.11';
port = '1711';
app.listen(port, host, function () {
  console.log(`TourServer listening on IPv4: ${host}:${port}`);
});



// app.listen(3000, function () {
//   console.log(`AddTourTest running on IPv4`);
//   var contents = fs.readFileSync('../tourServer/tours.json');
//   var jsonContent = JSON.parse(contents);
//   const name = jsonContent.map(info => info.name);
//   const city = jsonContent.map(info => info.city);
//   const date = jsonContent.map(info => info.date);

//   for (i = 0; i < jsonContent.length; i++) {
//     console.log("Tour", i + 1, "Name: ", name[i], ",", "Place:", city[i], ",", "Date: ", date[i]);
//   }
// })