jest.mock('react-native-device-info', () => {
  return {
    getVersion: () => 4,
    getUniqueId: async ()=> '7291383138913323',
    getBundleId: async ()=> 'com.thecommonsproject.smarthealthcardverifier'
  }
})

jest.mock('uuid', ()=>{
  return {
    v5:()=>"testuuid"
  }
})
