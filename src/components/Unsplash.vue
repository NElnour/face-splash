<template>
  <div>
    <SearchBar @refresh-view="refreshView" />
    <UnsplashDeck ref="imagesList"/>
  </div>
</template>

<script scoped>
import SearchBar from "./SearchBar";
import UnsplashDeck from "./UnsplashDeck";

export default {
  components: {
    SearchBar,
    UnsplashDeck
  },
  methods: {
    refreshView() {
      this.$refs.imagesList.setImages();
    }
  }
};
</script>

<style scoped></style>
