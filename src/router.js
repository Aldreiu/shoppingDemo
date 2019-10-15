import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home/Home.vue'
// import Order from './pages/Order/Order.vue'
import Profile from './pages/Profile/Profile.vue'
import Search from './pages/Search/Search.vue'
import Login from './pages/Login/Login.vue'

import Shop from './pages/Shop/Shop.vue'
import ShopGoods from './pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from './pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from './pages/Shop/ShopRatings/ShopRatings.vue'


const Order = () => import('./pages/Order/Order.vue');


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/home'
      // component: Home
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path:'/home',
      component:Home,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/Login',
      component:Login
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'goods',
          component:ShopGoods
        },
        {
          path:'info',
          component:ShopInfo
        },
        {
          path:'ratings',
          component:ShopRatings
        },
        {
          path:'',
          redirect:'/shop/goods'
        },
      ]
    },
  ],
  linkActiveClass:'is-active'
})
