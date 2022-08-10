module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        "root": ["./src"],
        "alias": {
          "test": "./__test__",
          "@/": "./"
        }
      }
    ]
  ]
};
