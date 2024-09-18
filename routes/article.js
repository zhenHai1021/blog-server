const { Router } = require('express');
const { createArticle, getArticle, getArticleById, updateArticle, deleteArticle, updateArticleById, deleteArticleById } = require('../controller/article');
const { auth } = require('../middleware/middleware');

const articleRoute = Router();

//resful api - according to then entity(user) called "/user"
//for each route for user
articleRoute
	.post('/article/create', auth, createArticle)
	// .post('/article/:id/comment', auth, createComment)
	.get('/article', auth, getArticle)
    .get('/article/:id', auth, getArticleById)
	.put('/article/update', auth, updateArticle)
    .put('/article/update/:id', auth, updateArticleById)
	.delete('/article/delete', auth, deleteArticle)
    .delete('/article/:id', auth, deleteArticleById)

module.exports = { articleRoute };
