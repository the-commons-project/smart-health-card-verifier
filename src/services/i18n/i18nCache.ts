export default class i18nCache {
  store:any = {}
  constructor(){
    this.store = {}
  }

  async set( lang:string, region:string, data:any ) {
    this.store[ lang ] = this.store[ lang ] || {}
    if( region == null || region.length == 0 ) {
      this.store[ lang ][ 'default' ] = data
    } else {
      this.store[ lang ][region] = data 
    }
  }

  async get( lang: string, region: string  ) : Promise< any > {
    return this.store[ lang ] ? 
      ( this.store[ lang ][ region ] || null ) 
      : null 
  } 
}
