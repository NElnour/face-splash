import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueMasonry from "vue-masonry-css";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(VueMasonry);

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
