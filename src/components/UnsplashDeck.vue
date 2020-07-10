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
            <v-btn
              icon
              color="#a13d63"
              @click="
                dialog = true;
                currImage = imageSrc;
              "
            >
              <v-icon>mdi-function-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card class="dialog-card">
            <v-card-actions class="dialog-actions">
              <v-btn icon color="#4d4d4d" @click="guessFaces">
                <v-icon>mdi-face-recognition</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon color="#4d4d4d" @click="guessSentiment">
                <v-icon>mdi-emoticon</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon color="#4d4d4d" @click="guessAgeGender">
                <v-icon>mdi-gender-male-female</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                icon
                color="#4d4d4d"
                @click="
                  dialog = false;
                  clearCanvas();
                "
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-actions>
            <canvas
              ref="mappedImage"
              width="5"
              height="5"
              class="mapped-image"
            ></canvas>
          </v-card>
        </v-dialog>
      </masonry>
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
      dialog: false,
      currImage: ""
    };
  },
  methods: {
    ...mapGetters({ getImages: "getImages" }),
    clearCanvas() {
      let ctx = this.$refs.mappedImage.getContext("2d");
      ctx.clearRect(
        0,
        0,
        this.$refs.mappedImage.width,
        this.$refs.mappedImage.height
      );
    },
    setImages() {
      this.images = this.getImages();
    },
    getUrl(imageSrc) {
      return imageSrc;
    },
    guessFaces() {
      console.log(this.currImage);

      let image = document.getElementById(this.currImage);
      faceDetect(image, this.$refs.mappedImage);
    },
    guessAgeGender() {
      let image = document.getElementById(this.currImage);
      ageAndGenderDetect(image, this.$refs.mappedImage);
    },
    guessSentiment() {
      let image = document.getElementById(this.currImage);
      sentimentDetect(image, this.$refs.mappedImage);
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  padding: auto;
}
.card {
  margin-bottom: 3%;
}
.dialog-card {
  align-items: center;
  text-align: center;
}
.mapped-image {
  margin-top: 5%;
}
.dialog-actions {
  background-color: #6dd3cebb;
}
</style>
// load manifest or model weights JSONs to load models // map each model to
button method // style the app // document code + README // deploy to github
pages or heroku
