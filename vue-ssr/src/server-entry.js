// 以前代码是运行在客户端上的 每个人都有一个独立的vue实例

// 如果跑在服务端上，不能所有人用的都是一个实例


import createApp from './app';

// 服务端渲染打包需要返回一个函数
// 这个函数会在访问服务器时被调用，是在服务端执行的

// 调用renderToString时 会传入信息,最终渲染实例
export default (context) => {

    return new Promise((resolve, reject) => {
        // context 就是包含着后端的非常多的信息
        const { app, router , store} = createApp();
        // 服务端需要拿到一个vue的实例，而且每个用户都是全新的
        router.push(context.url); // 跳转时路由可能是异步加载的

        // 等待路由加载完毕 再去通过实例来渲染
        router.onReady(() => {

            // 前端如果没有配置对应的路由 那应该返回的是404页面
            // 跳转完毕后获取匹配到的组件个数
            const matchComponents = router.getMatchedComponents();
            if (!matchComponents.length) {
                return reject({ code: 404 });
            }

            // 匹配到路由了
            Promise.all(matchComponents.map(component=>{
                console.log(component.asyncData)
                if(component.asyncData){
                    return component.asyncData(store);
                }
            })).then(()=>{
                // 将状态放到上下文的状态中 此时就会将这个状态放到window上
                context.state = store.state
                 // 此方法可以返回一个promise，返回最终的实例
                resolve(app);
            })
        }, reject);
    })

}