var util = require("util");

/**
 * Return a function that requires an API
 * @param {String} filename     API filename
 * @return {function}           function that requires the API
 * @private
 */
function requireAPI(filename) {
    return function(options) {
        try {
            var Endpoint = require("./" + filename);
            var ep = new Endpoint(options);
            return Object.freeze(ep);
        }
        catch(e) {
            throw new Error(util.format("Unable to load endpoint %s: %s", filename, e.message));
        }
    }
}

/**
 * APIs to be exported
 * @private
 * @type {Object}
 */
var APIs = {
    "membres": requireAPI("membres"),
    //"mps": requireAPI("mps")
};

/**
 * Exposes the APIs
 * @type {Object}
 */
module.exports = APIs;
