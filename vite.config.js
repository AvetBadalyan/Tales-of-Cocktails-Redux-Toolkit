import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@components': resolve(__dirname, './src/components'),
			'@pages': resolve(__dirname, './src/pages'),
			'@redux': resolve(__dirname, './src/redux'),
			'@hooks': resolve(__dirname, './src/hooks'),
			'@services': resolve(__dirname, './src/services'),
			'@assets': resolve(__dirname, './src/assets'),
			'@styles': resolve(__dirname, './src/styles')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				additionalData: `@use "@/styles/variables" as *;`
			}
		}
	},
	build: {
		outDir: 'dist',
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom', 'react-router-dom'],
					redux: ['@reduxjs/toolkit', 'react-redux']
				}
			}
		}
	},
	server: {
		port: 3000,
		open: true
	}
})
