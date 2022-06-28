import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'lib/index.ts'),
			name: 'HTMLWriter',
			formats: ['es', 'cjs'],
			fileName: format => `react-html-writer.${format}.js`
		},
		rollupOptions: {
			external: ['@types/react', '@types/react-dom', '@types/styled-components', 'react', 'react-dom', 'styled-components']
		}
	},
	resolve: {
		alias: {
			'@': __dirname,
			'@lib/components': resolve(__dirname, 'lib/components'),
			'@lib': resolve(__dirname, 'lib'),
			'@demo/components': resolve(__dirname, 'test/demo/components'),
			'@demo': resolve(__dirname, 'test/demo')
		}
	}
})
