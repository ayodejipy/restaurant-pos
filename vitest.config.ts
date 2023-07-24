import { defineConfig } from 'vitest/config'
import AutoImport from 'unplugin-auto-import/vite'

const NuxtImports = ['useNuxtApp']


export default defineConfig({
	plugins: [
		AutoImport({
			imports: ['vitest', 'vue', 'vue-router', {
				'#imports': NuxtImports
			}],
			dts: true, // generate TypeScript declaration
		}),
	],
	test: {
		environment: 'jsdom',
		globals: true,
		include:['./stores/*.test.ts']
	},
})