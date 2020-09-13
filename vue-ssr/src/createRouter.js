// 创建路由文件, 只是导出的解构需要是一个函数


import Vue from 'vue';
import VueRouter from  'vue-router';

Vue.use(VueRouter)

let Foo = ()=> import('./components/Foo.vue');
let Bar = () => import('./components/Bar.vue');

export default ()=>{
    const router = new VueRouter({
        mode:'history',
        routes:[
            {path:'/',component:Foo},
            {path:'/bar',component:Bar},
        ]
    })
    return router;
}


