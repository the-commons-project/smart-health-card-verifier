import { JWK } from 'react-native-jose'
import * as utils from '../utils'

export type KeySet = {
  keys: JWK.Key[]
}

export class KeysStore {
  static store = JWK.createKeyStore()

  static resetStore = () => {
    KeysStore.store = JWK.createKeyStore()
  }
}
