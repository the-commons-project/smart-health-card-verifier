"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeysStore = void 0;

var _reactNativeJose = require("react-native-jose");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class KeysStore {}

exports.KeysStore = KeysStore;

_defineProperty(KeysStore, "store", _reactNativeJose.JWK.createKeyStore());

_defineProperty(KeysStore, "resetStore", () => {
  KeysStore.store = _reactNativeJose.JWK.createKeyStore();
});
//# sourceMappingURL=keys.js.map