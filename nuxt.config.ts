// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/strapi",
    "@nuxtjs/google-fonts",
  ],
  strapi: {
    url: "https://data.elektron.art",
  },
  googleFonts: { families: { Inter: [400, 600, 700] } },
});
