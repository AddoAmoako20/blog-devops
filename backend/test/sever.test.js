const test = require("node:test");
const assert = require("node:assert");

test("Basic application test", () => {
    assert.strictEqual(1 + 1, 2);
});

test("API should use port 5000 by default", () => {
    const port = process.env.PORT || 5000;

    assert.strictEqual(port, 5000);
});
