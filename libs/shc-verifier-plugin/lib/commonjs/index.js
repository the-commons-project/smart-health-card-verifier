"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SHCVerifier: true
};
exports.SHCVerifier = void 0;

var _qr = require("./qr");

var _Config = require("./models/Config");

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

class SHCVerifier {
  constructor(options) {
    (0, _Config.setVerifierInitOption)(options.shc);
    console.info("SHCVerifier: initialized");
  }

  canVerify(payloads) {
    if (payloads.length > 0 && payloads[0].length > 4 && payloads[0].startsWith("shc:/")) {
      return Promise.resolve(this);
    }

    return Promise.reject(null);
  }

  validate(payloads) {
    return (0, _qr.validate)(payloads);
  }

}

exports.SHCVerifier = SHCVerifier;
//# sourceMappingURL=index.js.map