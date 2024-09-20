const { Router } = require('express');
const { createUser, login, getUser, updateUser, deleteUser } = require('../controller/user');
const { auth } = require('../middleware/middleware');

const userRoute = Router();

//resful api - according to then entity(user) called "/user"
//for each route for user
userRoute
	.post('/user/create', createUser)
	.get('/user/get', auth, getUser)
	.put('/user/update', auth, updateUser)
	.delete('/user/delete', auth, deleteUser)
	.post('/user/login', login);

module.exports = { userRoute };
