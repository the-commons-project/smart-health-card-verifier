import type { Config } from '@jest/types'

const transformIgnoreModules = [
  '@react-native/polyfills',
  // 'react-native',
  'react-native-permissions',
  // 'react-native-iphone-x-helper',
  // '@react-navigation',
  // 'react-native-webview',
  // '@react-native-cookies',
  // 'react-native-qrcode-scanner'
]

const rootPath = (process.cwd())
const config: Config.InitialOptions = {

  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  transformIgnorePatterns: [
    // `node_modules/(?!(${transformIgnoreModules.join('|')})/)`,
    'node_modules\/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)'
  ],
  coveragePathIgnorePatterns: [
    '*node_modules*'
  ],
  rootDir: rootPath,
  setupFiles:[
    '<rootDir>/config/jest/setup.js',
    '<rootDir>/config/jest/mock/mockPermissions.js',
    '<rootDir>/config/jest/mock/barcode.js',
    '<rootDir>/config/jest/mock/netinfo.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'
  ],
  preset: 'react-native',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ]
}
export default config
