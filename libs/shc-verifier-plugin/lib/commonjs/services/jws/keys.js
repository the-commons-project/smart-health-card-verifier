"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeysStore = void 0;
var _nodeJose = require("node-jose");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class KeysStore {}
exports.KeysStore = KeysStore;
_defineProperty(KeysStore, "store", _nodeJose.JWK.createKeyStore());
_defineProperty(KeysStore, "resetStore", () => {
  KeysStore.store = _nodeJose.JWK.createKeyStore();
});
//# sourceMappingURL=keys.js.map