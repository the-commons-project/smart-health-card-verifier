"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidError = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class InvalidError extends Error {
  constructor(errorCode) {
    super();

    _defineProperty(this, "errorCode", void 0);

    this.errorCode = errorCode;
  }

}

exports.InvalidError = InvalidError;
//# sourceMappingURL=InvalidError.js.map