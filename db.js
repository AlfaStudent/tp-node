const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connect = () => {
    mongoose
        .connect(process.env.MONGODB_URL, options)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB", err));
};

module.exports = {
    connect,
};
