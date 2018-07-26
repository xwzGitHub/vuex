//引入网络数据请求
import { getProductList } from '../../api/index';

//初始化
const state = {
    list: [], //列表
    price: 0, //价格
    isSelectAll: false //全选的状态
}


//处理数据的函数   同步
const mutations = {
    //列表数据
    updateList: (state, { list }) => {
        state.list = list;
        console.log(".............list", list)
    },
    //价格
    totalPrice: (state) => {
        let price = 0;
        state.list.forEach(item => {
            if (item.checked) {
                price += item.count * item.prices
            }
        })
        state.price = price;
    },
    //数量
    changeNum: (state, { ind, type }) => {
        let list = state.list;
        list.forEach((item, index) => {
            if (index === ind) {
                if (type == "+") {
                    item.count++;
                } else {
                    if (item.count == 0) {
                        return;
                    }
                    item.count--;
                }
            }
        })
    },
    //单选
    selectItem: (state, { ind }) => {
        let list = state.list;
        list.forEach((item, index) => {
            if (index === ind) {
                item.checked = !item.checked
            }
        })
    },
    //全选
    selectAll: (state, { checked }) => {
        state.isSelectAll = !state.isSelectAll;
        state.list.forEach(item => {
            item.checked = state.isSelectAll;
        })
    }

}

//处理数据的函数   异步
const actions = {
    //引入   获取数据
    getProductList(context, payload) {
        getProductList().then(res => {
            return res.json();
        }).then(body => {
            console.log("body.....", body)
                //如果参数是context时：
                // context.commit({
                //     type: 'updateList',
                //     list: body.data
                // })
                // context.commit('updateList', { list: body });
                //如果参数是{commit}
                // commit({
                //     type: 'updateList',
                //     list: body
                // })
                // commit('updateList', { list: body });
            context.commit('updateList', { list: body });
            context.commit('totalPrice', payload);
        })
    },
    //数量
    changeNum: (context, payload) => {
        context.commit('changeNum', payload);
        context.commit('totalPrice');
    },
    //单选
    selectItem: (context, payload) => {
        context.commit('selectItem', payload);
        context.commit('totalPrice');
    },
    //全选
    selectAll: (context, payload) => {
        context.commit('selectAll', payload);
        context.commit('totalPrice');
    }
}

const getters = {

}

//抛出
export default {
    state,
    mutations,
    actions,
    getters
}