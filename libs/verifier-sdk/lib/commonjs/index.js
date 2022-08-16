"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  VerifierFactory: true
};
Object.defineProperty(exports, "VerifierFactory", {
  enumerable: true,
  get: function () {
    return _VerifierFactory.VerifierFactory;
  }
});

var _VerifierFactory = require("./factory/VerifierFactory");

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
//# sourceMappingURL=index.js.map