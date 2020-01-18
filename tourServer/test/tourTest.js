const app = require('../app');
const assert = require('chai').assert;
const request = require('supertest');
const cookie = require('cookie');

describe('Get Tour Tests', function () {
	let response;
	let tours = null;
	before(async function () {
		response = await request(app).get('/tours');
	})
	it('Everything is OK', async function () {
		assert.equal(response.status, 200);
	});
	it('Returns an array', function () {
		tours = JSON.parse(response.text);
		assert.isArray(tours);
	});
	it('All tour elements have name and date', function () {
		tours.forEach(function (tour) {
			assert.containsAllKeys(tour, ['name', 'date']);
		});
	});
	it('Cookie with appropriate name is returned', function () {
		let cookies = response.header['set-cookie'].map(cookie.parse);
		let mycookie = cookies.filter(c => c.hasOwnProperty('ab4489toursid'));
		assert.notEmpty(mycookie);
	});
});

describe("Get an individual tour", function () {
	var tours;
	var existingID1;
	var existingID2;
	var nonExistingID;
	before(async function () {
		var res = await request(app).get("/tours");
		tours = res.body;
		existingID1 = tours[0]._id;
		existingID2 = tours[1]._id;
		nonExistingID = "NotExistingId";
	})
	it('Get an existing tour', async function () {
		console.log("trying path tours/7v9vzfHyeuMeb1d8");
		var res = await request(app).get("/tours/" + existingID1);
		tour = res.body[0];
		assert.equal(res.status, 200);
		assert.containsAllKeys(tour, ['name'], ['date']);
	})
	it('Get another	 existing tour', async function () {
		console.log("trying path tours/A2x3evuhLPfIzJdm");
		var res = await request(app).get("/tours/" + existingID2);
		tour = res.body[0];
		assert.equal(res.status, 200);
		assert.containsAllKeys(tour, ['name'], ['date']);
	})
	it('Try getting a non existing tour', async function () {
		console.log("trying path tours/NotExistingId");
		var res = await request(app).get("/tours/" + nonExistingID);
		console.log("-------------------------", res.body);
		assert.equal(res.status, 404);
	})
});

describe("Add tour test", function () {
	let tours;
	let agent = request.agent(app); // Use same agent for all tests
	before(async function () {
		await require('../initTourDatabase');
		let response = await agent.get('/tours');
		tours = JSON.parse(response.text);
	});
	it('Login as admin, add tour', async function () {
		let response = await agent.post('/login')
			.send({ "email": "sided1830@outlook.com", "password": "C}m8\"L,F" });
		assert.equal(response.status, 200);
		response = await agent.post('/tours/add')
			.send({
				"name": "Tsingy  De Bemaraha National Park",
				"city": "Madagascar",
				"date": "Nov 28 - Dec 6"
			});
		let toursAfter = JSON.parse(response.text);
		assert.equal(response.status, 200);
		// assert.equal(tours.length, toursAfter.length - 1);
	});
	it('Guest try to add tour', async function () {
		let response = await agent.get('/logout');
		response = await agent.post('/tours/add')
			.send({
				"name": "Tsingy  De Bemaraha National Park",
				"city": "Madagascar",
				"date": "Nov 28 - Dec 6"
			});
		assert.equal(response.status, 401);
	});
	it('Customer try to add tour', async function () {
		let response = await agent.post('/login')
			.send({ email: "sylvan2059@live.com", password: "1wQX_lYt" });
		assert.equal(response.status, 200);
		response = await agent.post('/tours/add')
			.send({
				"name": "Tsingy  De Bemaraha National Park",
				"city": "Madagascar",
				"date": "Nov 28 - Dec 6"
			});
		assert.equal(response.status, 401);
	})
});

describe("Delete tour tests", function () {
	let tours;
	let agent = request.agent(app); // Use same agent for all tests
	before(async function () {
		await require('../initTourDatabase');
		let response = await agent.get('/tours');
		tours = JSON.parse(response.text);
	});
	it('Login as admin, delete tour', async function () {
		let response = await agent.post('/login')
			.send({ "email": "sided1830@outlook.com", "password": "C}m8\"L,F" });
		assert.equal(response.status, 200);
		response = await agent.delete('/tours/delete/' + tours[0]._id);
		assert.equal(response.status, 200);
		response = await agent.get('/tours');
		let toursAfter = JSON.parse(response.text);
		assert.equal(tours.length, toursAfter.length + 1);
	});
	it('Guest try to delete tour', async function () {
		let response = await agent.get('/logout');
		response = await agent.delete('/tours/delete/' + tours[1]._id);
		assert.equal(response.status, 401);
	});
	it('Customer try to delete tour', async function () {
		let response = await agent.post('/login')
			.send({ email: "sylvan2059@live.com", password: "1wQX_lYt" });
		assert.equal(response.status, 200);
		response = await agent.delete('/tours/delete/' + tours[1]._id);
		assert.equal(response.status, 401);
	})
});
