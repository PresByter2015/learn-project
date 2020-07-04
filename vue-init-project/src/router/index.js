import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MainLayout from "../components/MainLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Homeaaa",
    meta: {
      title: "首页",
      hideInMenu: true,
      notCache: true,
      icon: "md-home"
    },
    component: MainLayout,
    children: [
      {
        path: "/home",
        name: "Home2",
        component: Home,
        meta: {
          title: "首页"
        },
        children: []
      },
      {
        path: "/",
        name: "Home1",
        component: Home,
        children: []
      },
      {
        path: "/about",
        meta: {
          title: "about页面"
        },
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "测试项目";
  }
  next();
});

// eslint-disable-next-line no-unused-vars
// router.beforeEach((to, from, next) => {
// ...
// console.log(to, from, next);
// });
export default router;
