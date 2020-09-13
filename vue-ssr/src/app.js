import Vue from 'vue';
import App from './App.vue';
import createRouter from './createRouter';
import createStore from './createStore';
export default () => {
    let router = createRouter();
    let store = createStore();
    let app = new Vue({
        store,
        router, // 注入路由系统
        render: h => h(App)
    });
    return { app, router ,store}
}


// 通过ajax 请求数据 将数据放到vuex中
// 服务端渲染 后端请求数据 把数据放到vuex中 （只能在路由级页面中使用）