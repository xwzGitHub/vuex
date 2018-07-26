//引入
import Vue from 'vue'
import store from './store/index'
import Index from './components/index.vue'

//注入
new Vue({
    el: '#app',
    store,
    render: h => h(Index)
})