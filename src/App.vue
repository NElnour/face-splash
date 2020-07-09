<template>
  <div id="app">
    <Unsplash />
  </div>
</template>

<script>
import Unsplash from "./components/Unsplash.vue";

export default {
  name: "App",
  components: {
    Unsplash
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
