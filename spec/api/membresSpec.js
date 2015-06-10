var nock = require("nock");
var Membres = require("../../api/membres");
var _urls = require("../../lib/urls");

describe("membres api", function() {
    var urls;

    beforeEach(function() {
        urls = _urls();
    });

    it("should be a constructor", function() {
        expect(typeof Membres).toBe("function");
        var membres = new Membres({ urls: urls });
        expect(typeof membres).toBe("object");
    });

    describe("api methods", function() {
        var membres;

        beforeEach(function() {
            membres = new Membres({ urls: urls });
        });

        describe("#monProfil", function() {
            it("should call the api", function(done) {
                nock("https://zestedesavoir.com")
                    .get("/api/membres/mon-profil/")
                    .reply(200, { username: "John Doe" });

                membres.monProfil(function(err, result) {
                    expect(err).toBeNull();
                    expect(result.username).toBe("John Doe");
                    done();
                });
            });
        });

        describe("#list", function() {
            it("should call the api", function(done) {
                nock("https://zestedesavoir.com")
                    .get("/api/membres/")
                    .reply(200, { results: [{ username: "John Doe" }] });

                membres.list(function(err, body) {
                    expect(err).toBeNull();
                    expect(body.results[0].username).toBe("John Doe");
                    done();
                });
            });
        });

        describe("#get", function() {
            it("should call the api", function(done) {
                nock("https://zestedesavoir.com")
                    .get("/api/membres/1/")
                    .reply(200, { username: "John Doe" });

                membres.get("1", function(err, body) {
                    expect(err).toBeNull();
                    expect(body.username).toBe("John Doe");
                    done();
                });
            });

            it("should have a required param", function(done) {
                membres.get({}, function(err) {
                    expect(err instanceof Error).toBe(true);
                    done();
                });
            });
        });

        describe("#create", function() {
            it("should call the api", function(done) {
                nock("https://zestedesavoir.com")
                    .post("/api/membres/", {
                        username: "John Doe",
                        email: "john@doe.me",
                        password: "secure"
                    })
                    .reply(200, { username: "John Doe" });

                membres.create({ resource: {
                    username: "John Doe",
                    email: "john@doe.me",
                    password: "secure"
                }}, function(err, body) {
                    expect(err).toBeNull();
                    expect(body.username).toBe("John Doe");
                    done();
                });
            });
        });

        describe("#update", function() {
            it("should call the api", function(done) {
                nock("https://zestedesavoir.com")
                    .put("/api/membres/1/", {
                        username: "John Doe",
                    })
                    .reply(200, { username: "John Doe" });

                membres.update({ pk: 1, resource: { username: "John Doe" }}, function(err, body) {
                    expect(err).toBeNull();
                    expect(body.username).toBe("John Doe");
                    done();
                });
            });
        });
    });
})
