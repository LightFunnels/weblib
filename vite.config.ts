import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig((opts) => {
	
	return {
		plugins: [
			react(),
			dts({
				outDir: path.resolve(__dirname, 'dest'),
				rollupTypes: true
			})
		],
		build:{
			lib:{
				entry: path.resolve(__dirname, 'src/components/index.tsx'),
				name: "ui",
				fileName: (format) => `ui.${format}.js`,
				formats: ['es', 'cjs', 'umd'],
			},
			rollupOptions: {
	      external: [
	      	'react',
	      	'react-dom',
		      '@popperjs/core',
					'class-variance-authority',
					'dateformat',
					'react-datepicker',
					'vite-plugin-dts',
	      ]
	    }
		}
	}

});