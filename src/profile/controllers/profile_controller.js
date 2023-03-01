const Person = require("../models/person");
const Company = require("../models/company");
const Profile = require("../models/profile");

const { getUrl } = require("../../../utils/getter");
const { removeFields } = require("../../../utils/remover");


const createProfile = async (req, res) => {
    const { kind, ...body } = req.body;
    let profile;

    try {
        switch (kind) {
            case "person":
                profile = new Person(body);
                break;
            case "company":
                profile = new Company(body);
                break;
            default:
                return res.status(400).json({ msg: "Invalid kind" });
        }

        await profile.save();

        res.header("Location", getUrl(req, profile.id));
        res.status(201).json(removeFields(profile.toObject()));
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};


const patch = async (req, res) => {
    try {
        const { firstName} = req.body;

        const profile = Profile.findOne({ owner: req.account });
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
        } else {
            profile.firstName = firstName ?? profile.firstName;
            await profile.save((err, profile) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(200).json(profile);
                }
            });
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
};

const getAccountById = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findById({id: id});
            if (err) {
                res.status(500).json({ error: err.message });
            }
            if (!profile) {
                res.status(404).json({ error: "profile not found" });
            }
            res.status(200).json(profile);
        } catch (err) {
            res.status(500).json(err.message)
    
        }
};

const getPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findById({id: id});
            if (err) {
                res.status(500).json({ error: err.message });
            }
            if (!profile) {
                res.status(404).json({ error: "profile not found" });
            }
            await Post.findById(id, (err, post) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                }
                if (!post) {
                    res.status(404).json({ error: "post not found" });
                }
                return res.status(200).json(post.content);
            })

    } catch (err) {
        res.status(500).json(err.message)
    }
    
};

const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const profile = await Profile.findById({id : id});
        if (!profile) {
            res.status(404).json({ error: "profile not found" });
        }
        await Comment.findById(id, (err, comment) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }
            if (!comment) {
                res.status(404).json({ error: "comment not found" });
            }
            return res.status(200).json(comment.content);
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
};


module.exports = {
    createProfile, patch, getAccountById, getPosts, getComments,
};
