# Hacker News App

A modern, cross-platform mobile application for browsing Hacker News with offline support, background updates, and customizable notifications.

## Features

- 📱 Cross-platform (iOS & Android)
- 🔄 Background fetch for latest stories
- 🔔 Push notifications for new posts
- 💾 Offline-first with smart caching
- 🎨 Beautiful UI with dark/light mode support
- ⚡ Optimized performance with React Query
- 🔍 Search and filter stories
- ⭐ Save favorite stories
- 🔕 Hide stories you're not interested in

## Tech Stack

- **Framework**: React Native (Expo)
- **State Management**: React Query
- **UI**: Tamagui
- **Navigation**: React Navigation
- **Storage**: AsyncStorage
- **Background Tasks**: expo-background-fetch
- **Push Notifications**: expo-notifications
- **Networking**: Fetch API
- **Type Safety**: TypeScript

## Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nealarec/hacker-news-app.git
   cd hacker-news-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npx expo start -c
   ```

4. Build and run the app:

   ```bash
   npx expo run:ios
   # or
   npx expo run:android
   ```

## Project Structure

```text
hacker-news-app/
├── src/
│   ├── background/       # Background tasks and services
│   ├── hooks/            # Custom React hooks
│   ├── providers/        # Context providers
│   ├── screens/          # App screens
│   ├── services/         # API and data services
│   ├── schemas/          # TypeScript type definitions
│   ├── ui/               # Reusable UI components
│   └── utils/            # Utility functions
├── App.tsx               # Main application component
├── app.config.js         # Expo configuration
└── package.json          # Project dependencies
```

## Configuration

## Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run typecheck` - Run TypeScript type checking

## Background Tasks

The app uses `expo-background-fetch` to periodically check for new stories and send notifications. The background task is configured to run every 15 minutes when the app is in the background.

## Notifications

The app supports push notifications for:

- New top stories
- Replies to your comments
- Saved story updates

## Offline Support

The app uses React Query with AsyncStorage to cache API responses and provide an offline-first experience. The cache is automatically invalidated based on network status.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Hacker News API](https://hn.algolia.com/api)
- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Tamagui](https://tamagui.dev/)
