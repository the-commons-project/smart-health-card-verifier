module.exports = {
  bumpFiles: [
    {
      filename: 'package.json',
    },
    {
      filename: 'package-lock.json',
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo'),
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo/android/increment'),
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo/ios'),
    }
  ]
}
