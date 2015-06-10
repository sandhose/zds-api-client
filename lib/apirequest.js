var request = require("./transporter");
var format = require("string-template");


function getMissingParameters(params, requiredParams) {
    var missingParameters = [];

    requiredParams.forEach(function(param) {
        if(!params[param]) {
            missingParameters.push(param);
        }
    });

    return missingParameters.length > 0 ? missingParameters : null;
}

function parsePath(path, params) {
    var escapedParams = {};

    Object.keys(params).forEach(function(value) {
        escapedParams[value] = encodeURIComponent(params[value]);
    });

    return format(path, escapedParams);
}

function wrapCallback(cb) {
    return function(err, res) {
        var body;
        try {
            body = JSON.parse(res.text);
        }
        catch(e) {
            err = err || e;
        }

        cb(err, body, res);
    };
}

function createAPIRequest(parameters, callback) {
    var params = parameters.params;
    var options = parameters.options;

    var missingParameters = getMissingParameters(params, parameters.requiredParams);
    if(missingParameters) {
        callback(new Error("Missing required parameters: " + missingParameters.join(", ")));
        return null;
    }

    options.url = parsePath(options.url, params);

    parameters.pathParams.forEach(function(param) {
        delete params[param];
    });

    var authClient = params.auth || null;
    delete params.auth;

    options.qs = params;
    options.useQuerystring = true;

    options.form = parameters.params.resource;
    delete params.resource;

    if(authClient) {
        authClient.getHeader(function(err, headers) {
            options.headers = headers;
            request(options, wrapCallback(callback));
        });
    }
    else {
        request(options, wrapCallback(callback));
    }
};

module.exports = createAPIRequest;

