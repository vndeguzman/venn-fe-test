import _ from "lodash";

let lodashPlugin = {};
lodashPlugin.install = Vue => (Vue.prototype.$_ = _);

export default lodashPlugin;
