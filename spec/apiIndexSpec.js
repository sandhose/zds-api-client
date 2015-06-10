var apis = require("../api");

describe("api index", function() {
    it("should return an object of function", function() {
        expect(typeof apis).toBe("object");
        for(var i in apis) {
            expect(typeof apis[i]).toBe("function");
        }
    });
});
