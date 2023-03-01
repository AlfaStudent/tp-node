const _lengthValidator = (val, minLength, maxLength) => {
    return val.length <= maxLength && val.length > minLength;
};

module.exports = {
    _lengthValidator,
};
