import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueMasonry from "vue-masonry-css";

Vue.use(VueMasonry);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
