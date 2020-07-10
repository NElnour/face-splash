import Vue from "vue";
import Vuex from "vuex";
import { toJson } from "unsplash-js";
import fetch from "node-fetch";
import Unsplash from "unsplash-js";

global.fetch = fetch;
const unsplash = new Unsplash({
  accessKey: "ghy6yYRbdtDFnCTL3uIYBB5jEnNm_vfiSyDX7Zkyg-A"
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    images: [],
    searchQuery: ""
  },
  getters: {
    getImages: state => {
      return state.images;
    }
  },
  mutations: {
    setSearchQuery: (state, query) => {
      state.searchQuery = query;
    },
    setImages: state => {
      state.images = [];
      unsplash.search
        .photos(state.searchQuery, 1, 10)
        .then(toJson)
        .then(result => {
          result.results.forEach(entry => {
            state.images.push(entry.urls.small);
          });
        });
    }
  },
  actions: {
    search(context) {
      context.commit("setImages");
    }
  },
  modules: {}
});
