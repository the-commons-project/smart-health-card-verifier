/* eslint no-shadow:off */
import { getStorage, KVStorage } from './Storage'

const enum PreferenceKey {
  PREF = 'Preference'
}

const PreferenceItemKey = {
  'Onborded':'Onborded'
}

const onbordVersion = 1

export default class PreferenceService {
  static _preference: PreferenceService
  static getPreferenceService (): PreferenceService {
    const Ps = PreferenceService
    Ps._preference = (  Ps._preference ?? new Ps() )
    return Ps._preference
  }

  _storage: KVStorage
  prefData: Record<string, any>
  currentSyncTimeout: any

  constructor () {
    this.currentSyncTimeout = null
    this.prefData = {}
    this._storage = getStorage()
  }

  async loadPreference (){
    const data = await this._storage.getJSON(PreferenceKey.PREF)
    this.prefData = data ?? {}
  }

  syncData () {
    const that = this
    this.currentSyncTimeout?.clearTimeout()
    this.currentSyncTimeout = null
    this.currentSyncTimeout = setTimeout( () => {
      that._storage.setJSON( PreferenceKey.PREF, that.prefData )
      return true
    }, 0 )
  }

  isOnboarded (): boolean {
    const data = this.prefData[ PreferenceItemKey.Onborded ] ?? null
    return ( data !== null )
  } 

  setOnboarded () {
    this.prefData[ PreferenceItemKey.Onborded ] = onbordVersion
    this.syncData()
  } 

}
