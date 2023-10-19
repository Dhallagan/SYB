import 'dotenv/config';

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
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      eas: {
        projectId: "dd523feb-67b6-4175-beb8-464d51fd5afc"
      }
    },
    "updates": {
      "url": "https://u.expo.dev/dd523feb-67b6-4175-beb8-464d51fd5afc"
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    },
  }
};