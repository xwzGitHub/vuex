import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/login"
import Homepage from '@/components/Homepage'

import See from '@/components/home/see'
import Modify from '@/components/home/modify'
import Naming from '@/components/home/Naming'
import Integral from '@/components/home/integral'
import Admin from '@/components/home/Admin'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/homepage',
            name: 'homepage',
            component: Homepage,
            children: [{
                    path: '/homepage/see',
                    component: See
                },
                {
                    path: '/homepage/modify',
                    component: Modify
                }, {
                    path: '/homepage/Naming',
                    component: Naming
                }, {
                    path: '/homepage/integral',
                    component: Integral
                },
                {
                    path: '/homepage/admin',
                    component: Admin
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})