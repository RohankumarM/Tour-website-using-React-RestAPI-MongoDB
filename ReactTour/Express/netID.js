const express = require('express');
const app = express();
let count = 0;


app.get('/netID', function (req, res) {
  let datetime = req.params.datetime;
  var d = new Date();
  res.send(` <h3>Name : Rohan Maisuria</h3>
             <p> NetID : ab4489 </p>`);
});


host = '127.97.27.11';
port = '1111';
app.listen(port, host, function () {
console.log(`netID running on IPv4: ${host}:${port}`);
}); 