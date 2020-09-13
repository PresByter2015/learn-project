<template>
  <div id="app">
    <div>
      <router-link to="/">foo</router-link>
      <router-link to="/bar">bar</router-link>

      <!-- 默认应该跟服务端说一下 先渲染那个组件 -->
      <router-view></router-view>
      <!-- 前端路由渲染是通过 historyapi实现的 -->
      <!-- 只有强制刷新 才需要服务端渲染， 默认vue-ssr 只有首屏刷新的那一屏是通过服务端渲染的后续逻辑都是通过前端路由来实现的 -->

      <!-- 渲染一个页面时 如果服务端不存在这个路径 需要将他跳转到首页，再去通过前端路由跳转 -->
    </div>
  </div>
</template>

<script>
import Bar from "./components/Bar.vue";
import Foo from "./components/Foo.vue";
export default {
  components: {
    Bar,
    Foo
  }
};
</script>