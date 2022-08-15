const path = require('path');
const pak_sdk =  require('./libs/verifier-sdk/package.json');
const pak_shc =  require('./libs/verifier-sdk/package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json', '.d.ts'],
        alias: {
          [pak_sdk.name]: path.join(__dirname, 'libs', pak_sdk.name),
          [pak_shc.name]: path.join(__dirname, 'libs', pak_shc.name),
        },
      },
    ],
  ],
};
