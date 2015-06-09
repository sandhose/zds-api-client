
var apis = require("./api");
var OAuth2 = require("./lib/OAuth2");

var ZDSAPIClient = function() {
    for(var apiName in apis) {
      this[apiName] = apis[apiName].bind(this);
    }

    this.auth.OAuth2 = OAuth2;

    global.zds_config = global.zds_config || {};
    this.setEndpoint("/api/");
};

ZDSAPIClient.prototype = {
    setEndpoint: function(endpoint) {
        global.zds_config.API_ENDPOINT = endpoint;
    }
}

module.exports = new ZDSAPIClient();
