function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export class InvalidError extends Error {
  constructor(errorCode) {
    super();

    _defineProperty(this, "errorCode", void 0);

    this.errorCode = errorCode;
  }

}
//# sourceMappingURL=InvalidError.js.map