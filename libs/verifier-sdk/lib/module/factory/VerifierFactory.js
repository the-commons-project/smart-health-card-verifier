function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class VerifierFactory {
  static register(key, VerifierCls, option) {
    if (!!!this.Verifiers[key]) {
      this.Verifiers[key] = new VerifierCls(option);
    }
  }

  static getVerifiers() {
    return this.Verifiers;
  }

}

_defineProperty(VerifierFactory, "Verifiers", {});
//# sourceMappingURL=VerifierFactory.js.map