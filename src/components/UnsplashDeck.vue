<template>
  <v-main>
    <div>
      <masonry
        :cols="{ default: 4, 1555: 2, 765: 1 }"
        :gutter="{ default: '50px', 700: '25px' }"
      >
        <v-card
          shaped
          v-for="(imageSrc, index) in images"
          v-bind:key="index"
          class="card"
        >
          <img
            v-bind:src="getUrl(imageSrc)"
            v-bind:alt="imageSrc"
            v-bind:id="imageSrc"
            crossorigin="anonymous"
          />
          <v-card-actions>
            <v-btn icon @click="guessFaces(imageSrc)">
              <v-icon>mdi-face-recognition</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="guessSentiment(imageSrc)">
              <v-icon>mdi-emoticon</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="guessAgeGender(imageSrc)">
              <v-icon>mdi-gender-male-female</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </masonry>
    </div>
    <div class="canvas">
      <canvas
        ref="mappedImage"
        width="5"
        height="5"
      ></canvas>
    </div>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import { faceDetect, ageAndGenderDetect, sentimentDetect } from "../mixins";

export default {
  data() {
    return {
      images: [],
    };
  },
  methods: {
    ...mapGetters({ getImages: "getImages" }),
    setImages() {
      this.images = this.getImages();
    },
    getUrl(imageSrc) {
      return imageSrc;
    },
    guessFaces(imageSrc) {
      console.log(this.$refs.mappedImage);
      let image = document.getElementById(imageSrc);
      faceDetect(image, this.$refs.mappedImage);
    },
    guessAgeGender(imageSrc) {
      let image = document.getElementById(imageSrc);
      ageAndGenderDetect(image, this.$refs.mappedImage);
    },
    guessSentiment(imageSrc) {
      let image = document.getElementById(imageSrc);
      sentimentDetect(image, this.$refs.mappedImage);
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  padding: auto;
}
.canvas {
  position: fixed;
  z-index: 2;
  bottom: 0;
  margin: 0;
}
.card {
  margin-bottom: 3%;
}
</style>
// load manifest or model weights JSONs to load models // map each model to
button method // style the app // document code + README // deploy to github
pages or heroku
