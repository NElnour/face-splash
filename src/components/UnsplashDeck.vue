<template>
  <div>
    <masonry
      :cols="{ default: 4, 999: 2 }"
      :gutter="{ default: '50px', 700: '25px' }"
    >
      <div v-for="(imageSrc, index) in images" v-bind:key="index">
        <img v-bind:src="getUrl(imageSrc)" v-bind:alt="imageSrc" />
      </div>
    </masonry>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      images: [],
    };
  },
  methods: {
    ...mapGetters({ getImages: "getImages" }),
    setImages() {
      this.images = this.getImages()
    },
    getUrl(imageSrc) {
      return imageSrc;
    },
  },
};
</script>

<style scoped>
div {
  padding-top: 3%;
}
</style>

// make images computed, bind in vuex store, authentication // enable grid view,
enable selecting a photo // add button for facial recognition
