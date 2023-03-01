const Post = require("./models/post");
const RESPONSE_MESSAGES = require("../../__constants__/response_messages");
const { _lengthValidator } = require("./validator");

const postExistsMiddleware = async function (req, res, next) {
    const post = await Post.findOne({ id: req.params.id });
    if (!post) {
        return res.status(404).json({ msg: RESPONSE_MESSAGES.POST_NOT_FOUND });
    }

    req.post = post;

    next();
};

const contentBodyMiddleware = function (req, res, next) {
    const content = req.body.content;

    if (!content) {
        return res.status(400).json({ msg: "content is required" });
    }

    if (!_lengthValidator(content, 10, 200)) {
        return res.status(400).json({ msg: RESPONSE_MESSAGES.INVALID_POST_BODY_LENGTH(10, 200) });
    }

    next();
};

module.exports = {
    contentBodyMiddleware,
    postExistsMiddleware,
};
