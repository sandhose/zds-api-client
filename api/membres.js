var debug = require("debug")("zds-api:membres");
var urls = require("../lib/urls");
var createAPIRequest = require("../lib/apirequest");

function Membres(options) {
    var self = this;
    this.api_url = options.urls.API_ROOT + "/membres";

    this.monProfil = function(params, callback) {
        debug("called #monProfil");
        var parameters = {
            options: {
                url: this.api_url + "/mon-profil/",
                method: "GET"
            },
            params: params,
            requiredParams: [],
            pathParams: []
        };

        return createAPIRequest(parameters, callback);
    };

    this.list = function(params, callback) {
        debug("called #list");
        var parameters = {
            options: {
                url: this.api_url + "/",
                method: "GET"
            },
            params: params,
            requiredParams: [],
            pathParams: []
        };

        return createAPIRequest(parameters, callback);
    };

    this.get = function(params, callback) {
        debug("called #get");
        if(typeof params === "string") {
            params = { pk: params };
        }

        var parameters = {
            options: {
                url: this.api_url + "/{pk}/",
                method: "GET"
            },
            params: params,
            requiredParams: ["pk"],
            pathParams: ["pk"]
        };

        return createAPIRequest(parameters, callback);
    };

    this.create = function(params, callback) {
        debug("called #create");
        var parameters = {
            options: {
                url: this.api_url + "/",
                method: "POST"
            },
            params: params,
            requiredParams: ["username",  "email", "password"],
            pathParams: []
        };

        return createAPIRequest(parameters, callback);
    };

    this.update = function(params, callback) {
        debug("called #update");
        var parameters = {
            options: {
                url: this.api_url + "/{pk}/",
                method: "PUT"
            },
            params: params,
            requiredParams: ["pk"],
            pathParams: ["pk"]
        };

        return createAPIRequest(parameters, callback);
    };

    this.patch = function(pk) {
        return {
            lectureSeule: {
                set: function(params, callback) {
                    debug("called #lectureSeule.set");
                    params.pk = pk;
                    var parameters = {
                        options: {
                            url: this.api_url + "/{pk}/lecture-seule/",
                            method: "POST"
                        },
                        params: params,
                        requiredParams: ["pk"],
                        pathParams: ["pk"]
                    };

                    return createAPIRequest(parameters, callback);
                },
                unset: function(params, callback) {
                    debug("called #lectureSeule.unset");
                    params.pk = pk;
                    var parameters = {
                        options: {
                            url: this.api_url + "/{pk}/lecture-seule/",
                            method: "DELETE"
                        },
                        params: params,
                        requiredParams: ["pk"],
                        pathParams: ["pk"]
                    };

                    return createAPIRequest(parameters, callback);
                }
            },
            ban: {
                set: function(params, callback) {
                    debug("called #ban.set");
                    params.pk = pk;
                    var parameters = {
                        options: {
                            url: this.api_url + "/{pk}/ban/",
                            method: "POST"
                        },
                        params: params,
                        requiredParams: ["pk"],
                        pathParams: ["pk"]
                    };

                    return createAPIRequest(parameters, callback);
                },
                unset: function(params, callback) {
                    debug("called #ban.unset");
                    params.pk = pk;
                    var parameters = {
                        options: {
                            url: this.api_url + "/{pk}/ban/",
                            method: "DELETE"
                        },
                        params: params,
                        requiredParams: ["pk"],
                        pathParams: ["pk"]
                    };

                    return createAPIRequest(parameters, callback);
                }
            }
        };
    };
};

module.exports = Membres;
