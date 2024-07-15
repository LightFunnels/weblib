import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		// VitePWA({ registerType: 'autoUpdate' }),
		react()
	],
	resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
	},
	server: {
		hmr: false,
		port: 9002
	},
});