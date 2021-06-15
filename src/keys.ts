import { JWK } from 'react-native-jose'
import * as utils from './utils';

export type KeySet = {
  keys: JWK.Key[]
}

export const store = JWK.createKeyStore();
