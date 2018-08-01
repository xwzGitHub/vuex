import Vue from 'vue'
import store from './store/index';
import Index from './components/index'

new Vue({
    el: '#app',
    store,
    render: h => h(Index)
})