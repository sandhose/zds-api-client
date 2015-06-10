var debug = require("debug")("zds-api:oauth2");
var request = require("./transporter");
var urls = require("./urls");

/**
 * Handles OAuth2 authentication
 *
 * @param {string} clientId The application client ID
 * @param {string} clientSecret The application client secret
 * @constructor
 */
var OAuth2 = function(clientId, clientSecret) {
    debug("creating client with clientId '%s' and clientSecret '%s'", clientId, clientSecret);
    this.urls = urls();
    this.clientId = clientId;
    this.clientSecret = clientSecret;
};

/**
 * Get the `Authorization` header
 * @param {function} Callback function
 * @private
 */
OAuth2.prototype.getHeader = function(callback) {
    var self = this;
    if(this.credentials) {
        if(this.credentials.access_token && (new Date()).getTime() < this.credentials.expiry_date) {
            debug("access token (%s) hasn't expired, using it for authentication", this.credentials.access_token);
            callback(null, {
                "Authorization": "Bearer " + this.credentials.access_token
            });
        }
        else if(this.credentials.refresh_token) {
            debug("acces token expired, renewing it using refresh_token", this.credentials.refresh_token);
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
        debug("credentials not set");
        callback(null, {});
    }
};

/**
 * @callback tokenCallback
 * @param {Error} err
 * @param {Object} tokens
 * @param {Object} response
 */

/**
 * Get access_token using username/password or refresh_token
 * @param {Object} options - Authentication informations
 * @param {stirng} [options.refreshToken] - The refresh_token
 * @param {string} [options.username] - User's username
 * @param {string} [options.password] - User's password
 * @param {tokenCallback} callback
 */
OAuth2.prototype.getToken = function(options, callback) {
    var form = {
        client_id: this.clientId,
        client_secret: this.clientSecret
    };

    if(options.username && options.password) {
        debug("getting token with username '%s' and password '%s'", options.username, options.password);
        form.grant_type = "password";
        form.username = options.username;
        form.password = options.password;
    }
    else if(options.refreshToken) {
        debug("getting token using refresh_token '%s'", options.refreshToken);
        form.grant_type = "refresh_token";
        form.refresh_token = options.refreshToken;
    }
    else {
        callback(new Error("Only user/pass and refreshToken are supported"), {});
        return;
    }

    request({
        url: this.urls.OAUTH_ENDPOINT,
        method: "POST",
        form: form
    }, function(err, response) {
        var tokens = {};
        try {
            tokens = JSON.parse(response.text);
        } catch(e) {
            err = err || e;
        }

        debug("got tokens", tokens);

        if(!err && tokens && tokens.expires_in) {
            tokens.expiry_date = ((new Date()).getTime() + (tokens.expires_in * 1000));
        }

        var done = callback || function(){};
        done(err, tokens, response);
    });
};

module.exports = OAuth2;
