const router = require("express").Router();
const Profile = require("./profile");
const authenticate = require("../../middlewares/authenticate");
const { deleteAccount, login, register } = require("./controllers/account_controller");
const Comment = require("../../blog/models/comment");
const Post = require("../../blog/models/post");

const { createProfile, getAccountById, patch, getPosts, getComments } = require("./controllers/profile_controller");
const { getUrl } = require("../../utils/getter");
const authenticate = require("../../../middlewares/authenticate");

// @route   GET /
router.get("/", authenticate, async (req, res) => {
    try {       
        const profile = await Profile.findOne({owner: req.account});
        if(!profile) {
            res.status(404).json({error: "Profile not found"});
        }
        return res.status(200).json(profile);   
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
    
});

// @route   POST /
router.post("/", authenticate, createProfile);

// TODO
router.patch("/",authenticate, patch);

// TODO
router.get("/:id", authenticate, getAccountById);

// TODO
router.get("/:id/posts", authenticate, getPosts);

// TODO
router.get("/:id/comments", authenticate, getComments)
module.exports = router;
