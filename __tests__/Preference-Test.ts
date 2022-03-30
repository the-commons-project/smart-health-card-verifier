import PreferenceService from '../src/services/data/PreferenceService'


it('Set onboarded flag', async () => {
  jest.useFakeTimers()
  expect.assertions(2)
  const prefService = PreferenceService.getPreferenceService()
  let res = prefService.isOnboarded()
  expect(res).toEqual(false)
  prefService.setOnboarded()
  setTimeout(()=>{
    res = prefService.isOnboarded()
    expect(res).toEqual(true)
  }, 10)
  jest.runAllTimers(); 
})


