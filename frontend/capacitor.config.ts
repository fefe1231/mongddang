import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mongddang.app',
  appName: 'mongddang',
  webDir: 'dist',
  server: {
    url: 'https://27b3-117-20-198-157.ngrok-free.app',
    cleartext: true,
  },
};

export default config;
