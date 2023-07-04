// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/supabase", "nuxt-headlessui", "@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon", "@nuxt/image"],
    tailwindcss: {},
    pinia: {
        autoImports: ["defineStore", "storeToRefs"],
    },
    imports: {
        // Auto-import pinia stores defined in `~/stores`
        dirs: ['stores']
    },
    devtools: { enabled: true },
});
