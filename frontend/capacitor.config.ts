import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mongddang.app',
  appName: 'mongddang',
  webDir: 'dist',
  server: {
    url: 'https://8ad2-14-46-141-246.ngrok-free.app ',
    cleartext: true,
  },
};

export default config;
