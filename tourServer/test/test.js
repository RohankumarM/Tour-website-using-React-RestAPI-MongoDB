const assert = require('chai').assert;
const rp = require('request-promise-native');
const cookieJar = rp.jar();

let baseURL = 'https://cs651.grotto-networking.com';
// let baseURL = 'http://127.0.0.11:1711';

let loginCust = {
    uri: baseURL + '/login',
    json: true,
    method: "POST",
    body: {
        "email": "sylvan2059@live.com",
        "password": "1wQX_lYt"
    },
    jar: cookieJar
};

let tourSite = {
    uri: baseURL + '/tours',
    json: true,
    jar: cookieJar
};
let logout = {
    uri: baseURL + '/logout',
    json: true,
    method: "GET",
    jar: cookieJar
}

describe('Get Tour Tests', function () {
  let result;
  before(async function () {
      result = await rp(tourSite);
  });

  it('Check for Tour Array', async function () {
      console.log("Check for Tour array?");
      assert.isArray(result);
  });

  it('Check for appropriate fields in tours', function () {
      result.forEach(function (tour) {
          assert.containsAllKeys(tour, ['name', 'date', 'type']);
      })
  });
});

describe('Good Login Tests', function () {
  let result;
  let cookieValue;
  before(async function () { // Note async function!
      result = await rp(tourSite);
  });
  it('Check for TourSID cookie', function () {
      const cookies = cookieJar.getCookies(baseURL);
      let myCookies = cookies.filter((c) => c.key === 'ab4489toursid');
      assert.notEmpty(myCookies);
      cookieValue = myCookies[0].value;
      console.log(`cookie value = ${cookieValue}`);
  });
  it('Good Login, Changed Cookie', async function () {
      result = await rp(loginCust);
      const cookies = cookieJar.getCookies(baseURL);
      let myCookies = cookies.filter((c) => c.key === 'ab4489toursid');
      assert.notEmpty(myCookies);
      assert.notEqual(myCookies[0].value, cookieValue);
  });
  it('Logout, check no cookie', async function () {
      result = await rp(logout);
      const cookies = cookieJar.getCookies(baseURL);
      let myCookies = cookies.filter((c) => c.key === 'ab4489toursid');
      assert.empty(myCookies);
  });
})