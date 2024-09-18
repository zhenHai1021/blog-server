const { Router } = require('express');
const { createComment, getComment } = require('../controller/comment');
const { auth } = require('../middleware/middleware');

const commentRoute = Router();

//resful api - according to then entity(user) called "/user"
//for each route for user
commentRoute.post('/comment', auth, createComment).get('/comment', auth, getComment);

module.exports = { commentRoute };
