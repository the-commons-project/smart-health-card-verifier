import { JWK } from 'node-jose'

export interface KeySet {
  keys: JWK.Key[]
}

export class KeysStore {
  static store = JWK.createKeyStore()

  static resetStore = () => {
    KeysStore.store = JWK.createKeyStore()
  }
}
