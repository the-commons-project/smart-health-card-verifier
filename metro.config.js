/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const { getDefaultConfig } = require('metro-config');

module.exports = ( async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
      transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
        getTransformOptions: async () => ({
          transform: {
            experimentalImportSupport: false,
            inlineRequires: true
          },
        }),
      },
      resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'svg', 'json'], //add here
        assetExts: assetExts.filter(ext => ext !== 'svg')    
      },
      watchFolders: [
        path.resolve(__dirname, 'libs/verifier-sdk')
      ]

  };

})();