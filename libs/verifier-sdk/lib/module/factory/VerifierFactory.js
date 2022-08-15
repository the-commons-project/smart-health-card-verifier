function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class VerifierFactory {
  static register(key, VerifierCls) {
    if (this.Verifiers[key]) {
      const option = {};
      this.Verifiers[key] = new VerifierCls(option);
    }
  }

}

_defineProperty(VerifierFactory, "Verifiers", void 0);
//# sourceMappingURL=VerifierFactory.js.map