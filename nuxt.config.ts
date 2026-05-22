// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
export default defineNuxtConfig({
    modules: ['@nuxt/eslint'],

    css: [fileURLToPath(new URL('./assets/styles/main.scss', import.meta.url))],

    runtimeConfig: {
        MONGODB_URI: process.env.MONGODB_URI,
    },

    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
});
