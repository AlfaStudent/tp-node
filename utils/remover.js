const removeFields = function (value) {
    if (value) {
        delete value._id;
        delete value.__v;
    }

    if (value instanceof Array) {
        Array.prototype.forEach.call(value, (val) => {
            delete val._id;
            delete val.__v;
        });
    }

    return value;
};

module.exports = {
    removeFields,
};
