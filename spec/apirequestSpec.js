var nock = require("nock");
var createAPIRequest = require("../lib/apirequest");

describe("createAPIRequest", function() {
    it("should be a function", function() {
        expect(typeof createAPIRequest).toBe("function");
    });

    it("should make a request", function(done) {
        nock("http://example.com")
            .get("/")
            .reply(200, { test: true });

        createAPIRequest({
            options: {
                url: "http://example.com/",
                method: "GET"
            },
            params: {},
            requiredParams: [],
            pathParams: []
        }, function(err, result) {
            expect(err).toBeNull();
            expect(result.test).toBe(true);
            done();
        });
    });

    it("should parse path params", function(done) {
        nock("http://example.com")
            .get("/1/")
            .reply(200, { id: 1 });

        createAPIRequest({
            options: {
                url: "http://example.com/{id}/",
                method: "GET"
            },
            params: { id: 1 },
            requiredParams: ["id"],
            pathParams: ["id"]
        }, function(err, result) {
            expect(err).toBeNull();
            expect(result.id).toBe(1);
            done();
        });
    });

    it("should add params to querystring", function(done) {
        nock("http://example.com")
            .get("/search?q=test")
            .reply(200, { test: true });

        createAPIRequest({
            options: {
                url: "http://example.com/search",
                method: "GET"
            },
            params: { q: "test" },
            requiredParams: ["q"],
            pathParams: []
        }, function(err, result) {
            expect(err).toBeNull();
            expect(result.test).toBe(true);
            done();
        });
    });

    it("should throw an error if parameters are missing", function(done) {
        createAPIRequest({
            options: {
                url: "http://example.com/",
                method: "GET"
            },
            params: {},
            requiredParams: ["missingParameter"],
            pathParams: []
        }, function(err, result) {
            expect(err instanceof Error).toBe(true);
            done();
        });
    });

    it("should use params as callback", function(done) {
        nock("http://example.com")
            .get("/")
            .reply(200, { test: true });

        createAPIRequest({
            options: {
                url: "http://example.com",
                method: "GET"
            },
            params: function(err, result) {
                expect(err).toBeNull();
                expect(result.test).toBe(true);
                done();
            },
            requiredParams: [],
            pathParams: []
        });
    });

    it("should use `resource` as form data", function(done) {
        nock("http://example.com")
            .post("/", { username: "John Doe" })
            .reply(200, { test: true });

        createAPIRequest({
            options: {
                url: "http://example.com",
                method: "POST"
            },
            params: {
                resource: {
                    username: "John Doe"
                }
            },
            requiredParams: [],
            pathParams: []
        }, function(err, results) {
            expect(err).toBeNull();
            expect(results.test).toBe(true);
            done();
        });
    });

    it("should use auth client", function(done) {
        var authClient = {
            getHeader: function(callback) {
                callback(null, {
                    "Authorization": "Bearer 123456"
                });
            }
        };

        spyOn(authClient, "getHeader").and.callThrough();

        nock("http://example.com", {
                reqheaders: { "Authorization": "Bearer 123456" }
            })
            .get("/auth/")
            .reply(200, { test: true });

        createAPIRequest({
            options: {
                url: "http://example.com/auth/",
                method: "GET"
            },
            params: {
                auth: authClient
            },
            requiredParams: [],
            pathParams: []
        }, function(err, result) {
            expect(err).toBeNull();
            expect(result.test).toBe(true);
            expect(authClient.getHeader).toHaveBeenCalled();
            done();
        });
    });
});
