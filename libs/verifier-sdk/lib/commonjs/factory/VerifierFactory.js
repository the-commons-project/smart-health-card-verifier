"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerifierFactory = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class VerifierFactory {
  static register(key, VerifierCls, option) {
    if (!!!this.Verifiers[key]) {
      this.Verifiers[key] = new VerifierCls(option);
    }
  }

  static getVerifiers() {
    return this.Verifiers;
  }

}

exports.VerifierFactory = VerifierFactory;

_defineProperty(VerifierFactory, "Verifiers", {});
//# sourceMappingURL=VerifierFactory.js.map