import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.mindhealthai',
  appName: 'MindHealthAI',
  webDir: 'dist/emotional-support-chatbot/browser',

  plugins: {
    Keyboard: {
      resizeOnFullScreen: false,
    },
    EdgeToEdge: {
      backgroundColor: '#263973',
    },
  },
};

export default config;
