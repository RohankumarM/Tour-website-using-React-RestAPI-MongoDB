const rp = require('request-promise-native');

let site1 = {
    uri: 'https://windsurf.grotto-networking.com/data/tracks/track_2019_10_01.json',
    method: 'GET',
    json: true,
    resolveWithFullResponse: true
};

rp(site1).then(res =>{

  var startTime = 0;
  var data = res.body;

  if("start_time" in data){
    startTime = data["start_time"];
  }

  var points = data["points"];
  var pointsLength = points.length;

  console.log("Start time of track_2019_10_01 was: " + startTime);
  console.log("The session lasted " + (pointsLength / 60));
});

