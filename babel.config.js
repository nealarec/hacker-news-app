// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for Tamagui
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          config: "./tamagui.config.ts", // Path to your config file
          logTimings: true,
        },
      ],
      // Required for reanimated (often used by Tamagui for animations)
      "react-native-reanimated/plugin",
    ],
  };
};
