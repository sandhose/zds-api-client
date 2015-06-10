var request = require("request");
var urls = require("./urls")();

var OAuth2 = function(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
};

OAuth2.prototype = {
    getHeader: function(callback) {
        var self = this;
        if(this.credentials) {
            if(this.credentials.access_token && (new Date()).getTime() < this.credentials.expiry_date) {
                callback(null, {
                    "Authorization": "Bearer " + this.credentials.access_token
                });
            }
            else if(this.credentials.refresh_token) {
                this.getToken({ refreshToken: this.credentials.refresh_token }, function(err, tokens) {
                    if(err) {
                        callback(err, {});
                    }

                    self.credentials.access_token = tokens.access_token;
                    self.credentials.expiry_date = tokens.expiry_date;

                    callback(null, {
                        "Authorization": "Bearer " + self.credentials.access_token
                    });
                });
            }

        }
        else {
            callback(null, {});
        }
    },

    getToken: function(options, callback) {
        var form = {
            client_id: this.clientId,
            client_secret: this.clientSecret
        };

        if(options.username && options.password) {
            form.grant_type = "password";
            form.username = options.username;
            form.password = options.password;
        }
        else if(options.refreshToken) {
            form.grant_type = "refresh_token";
            form.refresh_token = options.refreshToken;
        }
        else {
            callback(new Error("Only user/pass and refreshToken are supported"), {});
            return;
        }

        request({
            url: urls.OAUTH_ENDPOINT,
            method: "POST",
            form: form
        }, function(err, response) {
            var tokens = {};
            try {
                tokens = JSON.parse(response.body);
            } catch(e) {
                err = err || e;
            }

            if(!err && tokens && tokens.expires_in) {
                tokens.expiry_date = ((new Date()).getTime() + (tokens.expires_in * 1000));
            }

            var done = callback || function(){};
            done(err, tokens, response);
        });
    }
};

module.exports = OAuth2;
