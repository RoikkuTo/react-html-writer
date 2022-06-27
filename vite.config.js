import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	root: './test/demo',
	build: {
		lib: {
			entry: resolve(__dirname, 'src/main.js'),
			name: 'HTMLWriter',
			fileName: format => `react-html-writer.${format}.js`
		},
		rollupOptions: {
			external: ['@types/react', 'react'],
			output: {
				globals: {
					react: 'React'
				}
			}
		}
	},
	resolve: {
		alias: {
			'@': __dirname,
			'@lib/components': resolve(__dirname, 'src/components'),
			'@lib': resolve(__dirname, 'src'),
			'@demo/components': resolve(__dirname, 'test/demo/components'),
			'@demo': resolve(__dirname, 'test/demo')
		}
	}
})
