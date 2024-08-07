import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';
import { useBasicStore } from "../store/basic";
import LikebocaiDefault from '../components/layouts/default.vue'
const serverRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: '系统首页',
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
  },
  {
    path: '/users',
    name: 'users',
    meta: {
      title: '用户列表',
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/user-list.vue'),
  }, {
    path: '/roles',
    name: 'roles',
    meta: {
      title: '角色管理',
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/role-list.vue'),
  }, {
    path: '/resources',
    name: 'resources',
    meta: {
      title: '权限资源',
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/resource-list.vue'),
  }, {
    path: '/torrent',
    name: 'torrent',
    meta: {
      title: '种子',
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/torrent.vue'),
  }, {
    path: '/upload',
    name: 'upload',
    meta: {
      title: '发布',
    },
    component: () => import(/* webpackChunkName: "dashboard" */'../views/upload-torrent.vue'),
  }
];

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      ...serverRoutes,
      {
        path: "/tabs",
        name: "tabs",
        meta: {
          title: "tab标签",
          permiss: "3",
        },
        component: () =>
          import(/* webpackChunkName: "tabs" */ "../views/tabs.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "个人中心",
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "注册",
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/register.vue"),
  },
  {
    path: "/forgotPassword",
    name: "ForgotPassword",
    meta: {
      title: "忘记密码",
    },
    component: () =>
      import(/*  */ "../views/forgotPassword.vue"),
  },
  {
    path: "/resetPassword",
    name: "ResetPassword",
    meta: {
      title: "重置密码",
    },
    component: () =>
      import("../views/resetPassword.vue")
  },
  {
    path: "/403",
    name: "403",
    meta: {
      title: "没有权限",
    },
    component: () => import(/* webpackChunkName: "403" */ "../views/403.vue"),
  },
    // registerLikebocai
    {
      path: "/likebocai",
      name: "likebocai",
      meta: {
        title: "likebocai | 框架",
      },
      component: LikebocaiDefault,
      children: [
        {
          path: "torrentList",
          name: "torrentList",
          meta: {
            title: "种子列表",
          },
          component: () => import(/* webpackChunkName: "torrentList" */ "../views/torrent-list.vue"),
        }
      ]
    },
    // registerLikebocai
    {
      path: "/registerLikebocai",
      name: "registerLikebocai",
      meta: {
        title: "likebocai | 注册",
      },
      component: () => import(/* webpackChunkName: "registerLikebocai" */ "../views/registerLikebocai.vue"),
    },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
/*else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
       // 如果没有权限，则进入403
       next('/403');
   }*/
// router.beforeEach(async (to, from, next) => {
//     document.title = `${to.meta.title} | Rocket PT`;
//     const token = localStorage.getItem('token');
//     const basicStore = useBasicStore();
//     if (!token && (to.path !== '/login' && to.path !== '/register') && to.path !== '/forgotPassword' && to.path !== '/resetPassword') {
//         next('/login');
//     } else {
//         if (token) {
//           try {
//             await basicStore.fetchUserinfo();
//           } catch(error) {
//             localStorage.removeItem('token');
//             return;
//           }
//         }
//         next();
//     }
// });
export default router;
