"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  verify: true,
  test: true
};
exports.test = test;
exports.verify = verify;

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

function verify(payload) {
  return payload.length > 0;
}

function test(payload) {
  return payload;
}
//# sourceMappingURL=index.js.map