import i18nUtils from '../src/services/i18n/i18nUtils'

jest.mock("react-native-localize", () => {
  return {
    getLocales: jest.fn(),
  };
});



it('Verifies incorrectly', async () => {
  const i18n = i18nUtils.initailize();
  const res = i18n.getKey("EN")
  expect(res).toEqual("en");
});

// it('Verifies incorrectly', async () => {
//   expect.assertions(1);

//   const data = fs.readFileSync(path.join(__dirname, 'fixtures/correct_data.txt'), 'utf8')
//   const res = await validate([data]);
//   expect(res).toEqual(undefined);
// });
