var superagent = require("superagent");

module.exports = function request(options, callback) {
    var req = superagent(options.method, options.url);
    if(options.headers) {
        req.set(options.headers);
    }
    if(options.qs) {
        req.query(options.qs);
    }
    if(options.form) {
        req.type("form");
        req.send(options.form);
    }
    req.end(callback);
};
