const express = require('express');
const app = express();
let count = 0;


app.get('/date', function (req, res) {
  let datetime = req.params.datetime;
  var d = new Date();
  res.send(` <h3>Rohan Maisuria</h3>
             <p> Date: ${d} </p>`);
});


host = '127.97.28.11';
port = '1111';
app.listen(port, host, function () {
console.log(`Current Date and Time App running on IPv4: ${host}:${port}`);
});