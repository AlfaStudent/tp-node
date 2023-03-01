const jwt = require("jsonwebtoken");
const profile = require("../src/models/profile");
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            return res.status(401).json({ error: "Invalid token" });
        }

        //req.id = decode.id;
        const account = await Account.findOne({
             _id: decode.id,
            "token": token,
        });
        req.user = {
            id: account._id,
            profileId: account.profile,
        }
        req.token = token;
        if (['POST', 'DELETE', 'UPDATE'].includes(req.method)) {
            const profilId = req.body.profile || req.params.id;
            profile.findById(profilId, (err, profile) => {
                if (err) {
                    return res.status(500).json({ error: "International server errr" });
                }
                if (!profile) {
                    return res.status(404).json({ error: "Profile not found" });

                }
                if(profilId.owner!== req.account) {
                    return res.status(401).json({ error: "Forbidden" });
                }

            })

        } else {
            next();
        }
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

module.exports = authenticate;
