export default class i18nCache {
  store: any = {}
  constructor (){
    this.store = {}
  }

  async set ( language: string, region: string, data: any ) {
    this.store[ language ] = this.store[language] || {}
    if ( region == null || region.length == 0 ) {
      this.store[ language ].default = data
    } else {
      this.store[ language ][region] = data 
    }
  }

  async get ( language: string, region: string  ): Promise< any > {
    return this.store[ language ] ? 
      ( this.store[ language ][ region ] || null ) 
      : null 
  } 
}
