const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const accountSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    provider: {
        type: String,
        default: "local",
    },
});

accountSchema.pre("save", function (next) {
    const account = this;

    if (!account.isModified("password")) {
        next();
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(account.password, salt, function (err, hash) {
            if (err) return next(err);

            account.password = hash;
            next();
        });
    });
});

accountSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

accountSchema.methods.generateJwt = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 7);

    return jwt.sign(
        {
            id: this.id,
            email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );
};

module.exports = mongoose.model("Account", accountSchema);
