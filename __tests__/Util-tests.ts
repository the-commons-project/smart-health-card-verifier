import {toUpper} from '../src/utils/utils'


it('Verifies character toUpper works correctly', async () => {
  var res = toUpper("2")
  expect(res).toEqual("2")
  res = toUpper( "test" )
  expect(res).toEqual("Test")
})
