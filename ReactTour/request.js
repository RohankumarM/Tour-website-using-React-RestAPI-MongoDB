
const rp = require('request-promise-native');
let year = 2019; 
let desiredCount = 150; 

function findMax10sec(list_speed) {
  let max_speed = list_speed[0];
  list_speed.forEach(function (element) {
    if (max_speed < element) {
      max_speed = element;
    }
  })
  return max_speed;
}

function findmaxDist(list_dist) {
  let max_dist = list_dist[0];
  list_dist.forEach(function (element) {
    if (max_dist < element) {
      max_dist = element;
    }
  })
  return max_dist;
}

async function getThem(year) {
  let curYear = year;

  let site = {
    uri: 'https://windsurf.grotto-networking.com/data/logs/windEvents' + curYear + '.json',
    method: 'GET',
    json: true
  };

  const data = await rp(site).then(function (data) {
    return data;
  });
  const totalCount = data.length;
  const max10sList = data.map(function (infoSpeed) {
    if (infoSpeed.max10sec) {
      // console.log(info.max10sec);
      return infoSpeed.max10sec;
    }
  })

  const maxDist = data.map(function (infoDist) {
    if (infoDist.distance) {
      return infoDist.distance;
    }
  })
  console.log("The number of sailing sessions in 2019 was: ", totalCount);
  console.log("The fastest 10 second speed average was: ", findMax10sec(max10sList));
  console.log("The longest single day distance was:", findmaxDist(maxDist));
}

getThem(2019);
