import to from "await-to-js";

let toPlugin = {};
toPlugin.install = Vue => (Vue.prototype.$to = to);

export default toPlugin;
