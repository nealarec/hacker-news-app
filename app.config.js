// @ts-check

/** @type {import('expo/config').ExpoConfig} */
const config = {
  name: "HackerNewsApp",
  slug: "hacker-news-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.nealarec.hackernews",
    buildNumber: "1.0.0",
    config: {
      usesNonExemptEncryption: false,
    },
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
        NSExceptionDomains: {
          localhost: {
            NSExceptionAllowsInsecureHTTPLoads: true,
            NSIncludesSubdomains: true,
          },
        },
      },
      UIBackgroundModes: ["fetch", "remote-notification", "processing"],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.nealarec.hackernews",
    versionCode: 1,
    permissions: [
      "android.permission.INTERNET",
      "android.permission.ACCESS_NETWORK_STATE",
      "android.permission.WAKE_LOCK",
      "android.permission.RECEIVE_BOOT_COMPLETED",
      "android.permission.FOREGROUND_SERVICE",
      "android.permission.POST_NOTIFICATIONS",
    ],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    // Aquí van tus variables de entorno
    // Se pueden acceder usando Constants.expoConfig.extra en tu app
    // Ejemplo: API_URL: process.env.API_URL || 'https://api.example.com',
    // Ejemplo de variables de entorno
    // API_URL: process.env.API_URL,
    // EAS_PROJECT_ID: process.env.EAS_PROJECT_ID,
    // Variables de entorno para diferentes entornos
    // (puedes sobrescribirlas al construir la app)
    // env: process.env.APP_ENV || 'development',
  },
  plugins: [
    // Agrega plugins de Expo aquí si es necesario
    // 'expo-font',
    // 'expo-secure-store',
    "expo-asset",
    "expo-notifications",
    "expo-background-fetch",
    "expo-task-manager",
  ],
};

// Aplicar configuraciones específicas por entorno
const ENV = process.env.APP_ENV || "development";

if (ENV === "production") {
  // Configuración específica para producción
  config.extra = {
    ...config.extra,
    // API_URL: 'https://api.production.com',
  };
} else if (ENV === "staging") {
  // Configuración para staging
  config.extra = {
    ...config.extra,
    // API_URL: 'https://api.staging.com',
  };
} else {
  // Configuración para desarrollo
  config.extra = {
    ...config.extra,
    // API_URL: 'http://localhost:3000',
  };
}

module.exports = config;
