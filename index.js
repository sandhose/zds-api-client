
var apis = require("./api");
var OAuth2 = require("./lib/OAuth2");

var ZDSAPIClient = function() {
    for(var apiName in apis) {
      this[apiName] = apis[apiName].bind(this);
    }

    this.auth = {};
    this.auth.OAuth2 = OAuth2;

    global.zds_config = global.zds_config || {};
};

ZDSAPIClient.prototype = {
    setBaseURL: function(baseURL) {
        global.ZDS_BASE_URL = baseURL;
    }
}

module.exports = new ZDSAPIClient();
