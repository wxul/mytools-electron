import config from './assets/config';
import Vue from 'vue';
import App from './views/app.vue';
import EUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

const DEBUG = config.DEBUG;
const log = config.log;

Vue.use(EUI);
Vue.config.debug = DEBUG;

const app = new Vue({
    render: h => h(App)
}).$mount("#app");

log("app start!");