// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url';
export default defineNuxtConfig({
    modules: ['@nuxt/eslint'],
    //css: ['~/assets/styles/main.scss'],

    css: [fileURLToPath(new URL('./assets/styles/main.scss', import.meta.url))],

    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
});
