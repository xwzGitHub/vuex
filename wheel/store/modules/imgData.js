import { getImgAll } from '../../api/index.js';
const state = {
    imgData: [] //数据

}

const mutations = {
    getImgAll: (state, payload) => {
        state.imgData = payload
    }
}

const actions = {
    getImgAll: ({ commit }, payload) => {
        getImgAll(payload).then(res => {
            res.json().then(body => {
                console.log("body", body.data)
                commit('getImgAll', body.data)
            })
        })
    },
    imgList: ({ commit }, payload) => {
        imgList(payload).then(res => {
            res.json().then(body => {
                console.log("body.......", body)
                commit("imgList", body)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}