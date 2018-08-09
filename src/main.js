import Vue from "vue";
import NProgress from "vue-nprogress";
import VueResource from "vue-resource";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/search";
import "vue-awesome/icons/database";
import "vue-awesome/icons/folder";

import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import toPlugin from "./plugins/toPlugin";

// Load plugins
Vue.component("icon", Icon);
Vue.use(toPlugin);
Vue.use(NProgress);
Vue.use(VueResource);

const nprogress = new NProgress({ parent: "body", showSpinner: false });

Vue.config.productionTip = false;

new Vue({
  router,
  nprogress,
  render: h => h(App)
}).$mount("#app");


