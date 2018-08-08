import Vue from "vue";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/search";
import "vue-awesome/icons/database";

import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import toPlugin from "./plugins/toPlugin";

// Load the icon plugin
Vue.component("icon", Icon);

// Load toPlugin
Vue.use(toPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
