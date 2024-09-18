const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const userSchema = new moongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      trim: true,
      default: "",
    },

    lastName: {
      type: String,
      trim: true,
      default: "",
    },

    password: {
      type: String,
    },

    bio: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);
//collection size is 16mb
//each article cannot > 16mb
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  unlike: {
    type: Number,
    default: 0,
  },
  /**
   * comments is an array of comment object ids
   * Each comment object id refers to a Comment document
   * @type {Array.<mongoose.Schema.ObjectId>}
   */
  comments: [{
    type: mongoose.Schema.ObjectId,
    ref: "Article",
  }],
});

const commentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},

		article: {
			type: mongoose.Schema.ObjectId,
			ref: 'Article',
		},
		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const User = mongoose.model("User", userSchema);
const Article = mongoose.model("Article", articleSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
  User,
  Article,
  Comment,
};
