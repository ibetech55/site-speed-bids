import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueGlide from "vue-glide-js";
import "vue-glide-js/dist/vue-glide.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import router from "../routes/index";
import store from "./store/index";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(VueGlide);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
