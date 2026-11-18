export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  modules: ["@pinia/nuxt", "@vueuse/nuxt"],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/scss/main.scss"],

  app: {
    head: {
      title: "Oleh | Portfolio",
      meta: [
        {
          name: "description",
          content: "My interactive developer portfolio",
        },
      ],
    },
  },
});
