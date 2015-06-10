var superagent = require("superagent");
var qs = require("querystring");

module.exports = function request(options, callback) {
    var req = superagent(options.method, options.url);
    if(options.headers) {
        req.set(options.headers);
    }
    if(options.qs) {
        req.query(options.qs);
    }
    if(options.form) {
        req.send(options.form);
    }
    req.end(callback);
};
