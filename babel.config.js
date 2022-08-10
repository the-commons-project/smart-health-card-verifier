const path = require('path');
const pak =  require('./libs/verifier-sdk/package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [pak.name]: path.join(__dirname, 'libs','verifier-sdk', pak.source),
        },
      },
    ],
  ],
};
