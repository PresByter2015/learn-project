// import { withRouter } from 'react-router-dom';

import asyncComponent from '../components/AsyncComponent/index';
// import Order from '../pages/orders/order/index';
// import Count from '../pages/Count';
// import Login from '../pages/Login';
// import GoodsList from '../pages/goods/goods-list/index'
// import GoodsType from '../pages/goods/goods-type/index'
// import GoodsEdit from '../pages/goods/goods-edit/index'
// import Agent from '../pages/distribution/agent/index'
// import Service from '../pages/system/service/index'
// import Company from '../pages/authManager/company/index'
// import List from '../pages/list/index';
// import Home from '../pages/home/index';
// import Detail from '../pages/detail/index';

export default [
    {
        path: '/',
        title: '首页',
        hideInMenu: false,
        icon: 'home',
        Component: asyncComponent(() => import('../pages/home/index')),
        children: [],
    },
    {
        path: '/auth',
        title: '权限管理',
        hideInMenu: false,
        icon: 'home',
        children: [
            {
                path: '/company',
                title: '企业管理',
                hideInMenu: false,
                icon: 'home',
                Component: asyncComponent(() => import('../pages/authManager/company/index')),
                children: [],
            },
            {
                path: '/goodstype',
                title: '商品分类',
                hideInMenu: false,
                icon: 'home',
                Component: asyncComponent(() => import('../pages/home/index')),
                children: [],
            },
            {
                path: '/goodsedit/:id?',
                title: '商品编辑',
                hideInMenu: true,
                icon: 'home',
                Component: asyncComponent(() => import('../pages/home/index')),
                children: [],
            },
        ],
    },
    {
        path: '/distribution',
        title: '分销',
        hideInMenu: true, //隐藏
        icon: 'home',
        // Component: () => import ('./pages/Count'),
        children: [
            {
                path: '/home',
                title: 'home',
                hideInMenu: false,
                icon: 'home',
                Component: asyncComponent(() => import('../pages/home/index')),
                children: [],
            },
        ],
    },
    {
        path: '/orders',
        title: '订单',
        hideInMenu: false,
        icon: 'home',
        children: [
            {
                path: '/detail',
                title: '订单管理detail',
                hideInMenu: false,
                icon: 'home',
                Component: asyncComponent(() => import('../pages/list/index')),
                children: [],
            },
        ],
    },
    {
        path: '/system',
        title: '系统',
        hideInMenu: false,
        icon: 'home',
        children: [
            {
                path: '/list',
                title: '客服管理list',
                hideInMenu: false,
                icon: 'home',
                Component: asyncComponent(() => import('../pages/list/index')),
                children: [],
            },
            {
                path: '/picture',
                title: '图片管理',
                hideInMenu: false,
                icon: 'home',
                Component: asyncComponent(() => import('../pages/home/index')),
                children: [],
            },
        ],
    },
];
