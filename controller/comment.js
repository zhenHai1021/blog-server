const { Comment } = require("../model/user");
const Joi = require('joi');


const createCommentValidationSchema = Joi.object({
	articleId: Joi.string().required('article id is required'),
	content: Joi.string().required('comment is required'),
	
});

const createComment = async (req, res) => {
	try {
		const { articleId, content } = req.body;
		const userId = req.id;
		const { error } = await createCommentValidationSchema.validateAsync({ articleId, content });

		if (error) {
			const message = error.details[0].message;
			const err = new Error(message);
			err.statusCode = 400;
			throw err;
		}

		const comment = await Comment.create({ content, user: userId, article: articleId });

		res.json({
			message: 'comment created successfully',
			succeeded: true,
			data: comment,
		});
	} catch (error) {
		const message = error?.message;
		const statusCode = error?.statusCode;
		res.status(statusCode ?? 400).json({
			message,
			succeeded: false,
			data: null,
		});
	}
};

const getComment = async (req, res) => {
    const { pageNumber, pageSize} = req.query;
    req.params
    const page = pageNumber || 1;
    const size = pageSize || 10;
    const limit = size;
    const skip = (page - 1) * limit;
	try {
        //sort by updatedAt -1 || 1
		const comments = await Comment.find({})
		.sort({ updatedAt: 1 })
		.populate({
			path: 'user',
			select: ['_id', 'email', 'firstName', 'lastName'],
		})
		.populate({
			path: 'article',
			select: '_id title author',
			populate: {
				path: 'author',
				select: '_id email firstName lastName',
			},
		})
        .skip(skip) //avoid no of items
        .limit(limit) //leave the rest
        .exec();
        const totalCount = await Comment.countDocuments().exec();
			
		res.status(200).json({
			message: 'comment successful retrieved',
			succeeded: true,
			data: comments,
            totalCount,
            pageSize: size,
            pageNumber: page,
		});
	} catch (error) {
		const message = error?.message;
		const statusCode = error?.statusCode;
		res.status(statusCode ?? 400).json({
			message,
			succeeded: false,
			data: null,
		});
	}
};

module.exports = { getComment, createComment };