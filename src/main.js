import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入reset.css  css代码覆盖浏览器默认的样式来统一样式
import '../src/assets/css/reset.css'
// 移动端点击延迟事件 0.3秒延迟
import FastClick from 'fastclick' 
import { Tabbar, TabbarItem, Search,Icon,NavBar,Button,Grid, GridItem,Field } from 'vant';
// 导入rem适配移动端的js
import './common/js/rem'
// 导入自己准备的icon
import './common/font/iconfont.css'

Vue.use(Tabbar).use(TabbarItem).use(Search).use(Icon).use(NavBar).use(Button).use(Grid).use(GridItem).use(Field);

FastClick.attach(document.body);   

// 入口文件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
