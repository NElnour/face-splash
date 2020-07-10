<template>
  <v-app>
    <v-app-bar app color="#fff" flat prominent dense hide-on-scroll>
      <v-spacer></v-spacer>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="./assets/logo.png"
        transition="scale-transition"
        width="200px"
      />
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Unsplash />
    </v-content>
  </v-app>
</template>

<script>
import Unsplash from "./components/Unsplash";

export default {
  name: "App",

  components: {
    Unsplash
  },

  data: () => ({
    //
  })
};
</script>
