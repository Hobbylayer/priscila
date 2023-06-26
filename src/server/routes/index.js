const express = require('express');

const router = express.Router();
const {
	usersController: { getUsers, postUser },
} = require('../controllers');

const routes = [
	{
		name: 'users',
		path: '/users',
		method: 'get',
		controller: getUsers,
	},
	{
		name: 'users',
		path: '/users',
		method: 'post',
		controller: postUser,
	},
];

for (const route of routes) {
	router[route.method](route.path, route.controller);
}

module.exports = router;
