jest.mock('react-native-localize', () => {
  return {
    getLocales: ()=> [{languageCode:"en", countryCode:"US"}]
  }
})


// jest.mock('react-i18next', () => ({
//   // this mock makes sure any components using the translate hook can use it without a warning being shown
//   useTranslation: () => {
//     return {
//       t: (str:string) => {
//         switch ( str ) {
//           case "Utility.Month" : 
//             return "Jan,Feb,Mar,Apr,Jun,Jul,Aug,Sep,Oct,Nov,Dec"
//           case ""
//         }


//       },
//       i18n: {
//         changeLanguage: () => new Promise(() => {}),
//       },
//     };
//   },
// }));


import { getLocalDateTimeStringData} from '../src/utils/timeUtils'
import i18nUtils from '../src/services/i18n/i18nUtils'
import i18next from 'i18next'

const i18nUtil = i18nUtils.initailize();


it('Verifies time is formatted correctly', async () => {
  await i18nUtil.initializeLocale();
  const { t } = i18next;
  const timeZone = "America/New_York"
  var res = getLocalDateTimeStringData("2022-04-20", timeZone, t )
  expect( res.year ).toEqual("2022")
})
