// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VuelazyLoad from 'vue-lazyload'
import store from "../store";
Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})

Vue.use(VuelazyLoad, {
    loading: '../static/loading.gif', //预加载图片
    preLoad: 1.3, //预加载高度比例
    attemmpt: 1 //加载数量
})