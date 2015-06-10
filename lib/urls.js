module.exports = function(baseURL) {
    if(baseURL === undefined) {
        baseURL = "https://zestedesavoir.com";
    }

    return {
        OAUTH_ENDPOINT: baseURL + "/oauth2/token/",
        API_ROOT: baseURL + "/api"
    };
};
