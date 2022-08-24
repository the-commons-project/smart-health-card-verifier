const path = require('path');
const pak_sdk =  require('./libs/verifier-sdk/package.json');
const pak_shc =  require('./libs/shc-verifier-plugin/package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    "@babel/plugin-proposal-export-namespace-from",
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json', '.d.ts'],
        alias: {
          "~": "./src",
          [pak_sdk.name]: path.join(__dirname, 'libs', pak_sdk.name),
          [pak_shc.name]: path.join(__dirname, 'libs', pak_shc.name),
        },
      },
    ],
  ],
};
