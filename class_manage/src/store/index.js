import Vue from 'vue'
import Vuex from 'vuex'

import fraction from './modules/fraction.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        fraction
    }
})