import path from 'path'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const NuxtImports = [
    'useNuxtApp',
    'useBaseFetch',
    'useRuntimeConfig',
    'useState',
    'useLazyAsyncData',
]

export default defineConfig({
    plugins: [
        vue(),
        Components({
            dirs: ['./components'],
            dts: true,
        }),
        AutoImport({
            imports: [
                'vitest',
                'vue',
                'vue-router',
                'pinia',
                {
                    '#imports': NuxtImports,
                },
            ],
            dts: true, // generate TypeScript declaration
        }),
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        include: ['./stores/tests/*.{spec,test}.ts', './tests/*.{spec,test}.ts'],
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, './'),
        },
    },
})
