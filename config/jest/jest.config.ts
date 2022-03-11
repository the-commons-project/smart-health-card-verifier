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
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/__mock__'
  ],
  rootDir: rootPath,
  setupFiles:[
    '<rootDir>/__tests__/__mock__/setup.js',
    '<rootDir>/__tests__/__mock__/mockPermissions.js',
    '<rootDir>/__tests__/__mock__/barcode.js',
    '<rootDir>/__tests__/__mock__/netinfo.js',
    '<rootDir>/__tests__/__mock__/@react-native-async-storage/async-storage.ts',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'
  ],
  moduleNameMapper:{
    'react-native-config': '<rootDir>/__tests__/__mock__/react-native-config/react-native-config'
  },
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
