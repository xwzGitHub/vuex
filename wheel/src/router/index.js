import Vue from 'vue'
import Router from 'vue-router'
//路由懒加载
const Index = () =>
    import ('../components/Index.vue')
const Car = () =>
    import ('../components/common/car.vue')
const Img = () =>
    import ("../components/common/img.vue")
const Type = () =>
    import ("../components/common/type.vue")
const Color = () =>
    import ('../components/common/color.vue')

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Index ',
        component: Index
    }, {
        path: '/car',
        component: Car
    }, {
        path: '/img',
        name: 'img',
        component: Img
    }, {
        path: "/type",
        component: Type
    }, {
        path: "/color",
        component: Color
    }]
})