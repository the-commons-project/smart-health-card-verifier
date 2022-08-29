function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { JWK } from 'react-native-jose';
export class KeysStore {}

_defineProperty(KeysStore, "store", JWK.createKeyStore());

_defineProperty(KeysStore, "resetStore", () => {
  KeysStore.store = JWK.createKeyStore();
});
//# sourceMappingURL=keys.js.map