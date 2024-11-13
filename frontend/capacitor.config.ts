import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mongddang.app',
  appName: 'mongddang',
  webDir: 'dist',
  server: {
    url: 'https://09ec-14-46-141-246.ngrok-free.app',
    cleartext: true,
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
