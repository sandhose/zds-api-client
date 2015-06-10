var urls = require("./lib/urls");
var apis = require("./api");
var OAuth2 = require("./lib/OAuth2");

var ZDSAPIClient = function() {
    for(var apiName in apis) {
      this[apiName] = apis[apiName].bind(this);
    }

    this.auth = {};
    this.auth.OAuth2 = OAuth2;
    this.urls = urls();

    global.zds_config = global.zds_config || {};
};

ZDSAPIClient.prototype = {
    setBaseURL: function(baseURL) {
        this.urls = urls(baseURL);
    }
}

module.exports = new ZDSAPIClient();
