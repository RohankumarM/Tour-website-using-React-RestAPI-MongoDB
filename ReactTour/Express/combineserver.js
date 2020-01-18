const express = require('express');
const app = express();
let count = 0;


app.get('/date', function (req, res) {
  let datetime = req.params.datetime;
  var d = new Date();
  res.send(`
             <p> Date: ${d} </p>`);
});


host = '127.97.22.11';
port = '1234';
app.listen(port, host, function () {
console.log(`Current Date and Time App running on IPv4: ${host}:${port}`);
});