var urls = require("../lib/urls");
var createAPIRequest = require("../lib/apirequest");

function Membres(options) {
    var self = this;
    this.api_url = urls().API_ROOT + "/membres";

    this.monProfil = function(params, callback) {
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
