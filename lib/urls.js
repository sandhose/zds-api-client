module.exports = function(baseURL) {
    var BASE_URL = baseURL || global.ZDS_BASE_URL || "https://zestedesavoir.com";
    return {
        OAUTH_ENDPOINT: BASE_URL + "/oauth2/token/",
        API_ROOT: BASE_URL + "/api"
    };
};
