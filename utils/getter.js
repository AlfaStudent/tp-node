function getUrl(req, extra) {
    let url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

    if (!req.originalUrl.includes(extra)) {
        url = (url.endsWith("/") ? url : url + "/") + `${extra}`;
    }

    return url;
}

module.exports = {
    getUrl,
};
