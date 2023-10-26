import * as dotenv from 'dotenv'
dotenv.config()

export default {
  expo: {
    name: 'Surf Yoga Beer',
    slug: 'surfyogabeer',
    privacy: 'public',
    platforms: ['ios', 'android'],
    version: '0.15.0',
    orientation: 'portrait',
    icon: './assets/SYB_Logo.jpeg',
    splash: {
      image: './assets/SYB_Logo.jpeg',
      resizeMode: 'contain',
      backgroundColor: '#000000'
    },
    updates: {
      fallbackToCacheTimeout: 0,
      url: "https://u.expo.dev/dd523feb-67b6-4175-beb8-464d51fd5afc"
    },
    runtimeVersion: {
      policy: 'sdkVersion'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    extra: {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      eas: {
        projectId: "dd523feb-67b6-4175-beb8-464d51fd5afc"
      }
    },
  }
};