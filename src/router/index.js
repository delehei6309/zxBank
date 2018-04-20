import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

import Index from '../containers/Index';
import Financial from '../containers/Financial';
import My from '../containers/My';
import Life from '../containers/Life';
import Insurance from '../containers/Insurance'

import {setTitle} from '../tools/operation';

let routes = [
    {
        path: '/home',
        name: 'home',
        component: Index,
        meta: {
            title: '首页'
        }
    }, {
        path: '/financial',
        name: 'financial',
        component: Financial,
        meta: {
            title: '理财'
        }
    }, {
        path: '/life',
        name: 'life',
        component: Life,
        meta: {
            title: '生活'
        }
    }, {
        path: '/my',
        name: 'my',
        component: My,
        meta: {
            title: '我的'
        }
    },
    {
        path: '/insurance',
        name: 'insurance',
        component: Insurance,
        meta: {
            title: '保险'
        }
    }
];
routes.map(route => {
    route.beforeEnter = (to, from, next) => {
        let {meta} = to;
        let {title} = meta;
        setTitle(title);
        next();

    };
});
routes.push({
    path: '*',
    redirect: '/home'
});
export default new Router({
    mode: 'history',
    routes
})
