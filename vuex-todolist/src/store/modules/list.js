const state = {
    type: 'all', //all 表示全部， finish表示已完成, unfinish表示未完成
    list: [{
        text: '您好！',
        finish: false
    }, {
        text: '星期三',
        finish: true
    }, {
        text: '下雨啦',
        finish: true
    }]
}

const mutations = {
    addList: (state, payload) => {
        state.list.push({
            text: payload,
            finish: false
        });
    },
    finish: (state, payload) => {
        state.list.forEach(item => {
            if (item == payload) {
                item.finish = !item.finish;
            }
        })
        console.log(state.list)
    },
    changeType: (state, payload) => {
        state.type = payload;
    }
}



export default {
    state,
    mutations
}