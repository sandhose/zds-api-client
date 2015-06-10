var nock = require("nock");

var zdsapiClient = require("../");
var OAuth2;

describe("OAuth2", function() {
    beforeEach(function() {
        OAuth2 = zdsapiClient.auth.OAuth2;
    });

    it("should create a client", function() {
        var client = new OAuth2("1234", "6789");
        expect(client.clientId).toBe("1234");
        expect(client.clientSecret).toBe("6789");
    });

    describe("#getToken", function() {
        var client;
        beforeEach(function() {
            client = new OAuth2("1234", "6789");
        });

        it("should get token with username/password", function(done) {
            nock("https://zestedesavoir.com")
                .post("/oauth2/token/", {
                    client_id: "1234",
                    client_secret: "6789",
                    grant_type: "password",
                    username: "user",
                    password: "pass"
                })
                .reply(200, {
                    access_token: "the access token",
                    refresh_token: "the refresh token",
                    expires_in: 36000
                });
            client.getToken({
                username: "user",
                password: "pass"
            }, function(err, tokens) {
                expect(err).toBeNull();
                expect(tokens.access_token).toBe("the access token");
                expect(tokens.refresh_token).toBe("the refresh token");
                done();
            });
        });

        it("should get token with refresh_token", function(done) {
            nock("https://zestedesavoir.com")
                .post("/oauth2/token/", {
                    client_id: "1234",
                    client_secret: "6789",
                    grant_type: "refresh_token",
                    refresh_token: "the refresh token"
                })
                .reply(200, {
                    access_token: "new access token"
                });

            client.getToken({
                refreshToken: "the refresh token"
            }, function(err, tokens) {
                expect(err).toBeNull();
                expect(tokens.access_token).toBe("new access token");
                done();
            });
        });

        it("should return an error with no params", function(done) {
            client.getToken({}, function(err, tokens) {
                expect(err instanceof Error).toBe(true);
                done();
            });
        });
    });
});
