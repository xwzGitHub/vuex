import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

import imgData from './modules/imgData.js';

export default new Vuex.Store({
    modules: {
        imgData
    }
})