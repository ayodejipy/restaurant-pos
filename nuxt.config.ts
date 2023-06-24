// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["nuxt-headlessui", "@nuxtjs/tailwindcss", "@pinia/nuxt", 'nuxt-icon'],
    tailwindcss: {},
    pinia: {
        autoImports: ["defineStore"],
    },
    devtools: { enabled: true },
});