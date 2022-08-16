function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class SHCVerifier {
  constructor(option) {
    _defineProperty(this, "option", void 0);

    this.option = option;
    console.info("SHCVerifier: initialized");
  }

  canVerify(payloads) {
    if (payloads.length > 0 && payloads[1].length > 4 && payloads[0].startsWith("shc:/")) {
      return Promise.resolve(this);
    }

    return Promise.reject(null);
  }

}
//# sourceMappingURL=index.js.map