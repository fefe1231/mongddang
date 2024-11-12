import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mongddang.app',
  appName: 'mongddang',
  webDir: 'dist',
  server: {
    url: ' https://8ac8-118-235-82-1.ngrok-free.app',
    cleartext: true,
  },
};

export default config;
