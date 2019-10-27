import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '../src/store/store'
// 导入reset.css  css代码覆盖浏览器默认的样式来统一样式
import '../src/assets/css/reset.css'
// 移动端点击延迟事件 0.3秒延迟
import FastClick from 'fastclick' 
import { Tabbar, TabbarItem, Search,Icon,NavBar,Button,Grid, GridItem,Field,Rate,Toast,Tab, Tabs,Collapse, CollapseItem,Lazyload,GoodsAction,GoodsActionIcon,GoodsActionButton,Popup } from 'vant';
// 导入rem适配移动端的js
import './common/js/rem'
// 导入自己准备的icon
import './common/font/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../node_modules/swiper/css/swiper.min.css'
import './mock/mockSerer'   // 因为mock本身没有向外暴露什么  就类似css一样丢进去 加载mockserver即可
import "./assets/icon/iconfont.css" // 引入自定的icon
import VueLazyload from 'vue-lazyload'
import loading from './common/image/loading.gif'
// 引入时间格式插件
import moment from 'moment'

// 定义全局的过滤器  使用 monment来解决
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(dataStr).format(pattern)
})

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.use(VueLazyload, {
    loading
  // loading: require('img/loading.png'),//加载中图片，一定要有，不然会一直重复加载占位图
  // error: require('img/error.png')  //加载失败图片
});

Vue.use(Tabbar).use(TabbarItem).use(Search).use(Icon).use(NavBar).use(Button).use(Grid).use(GridItem).use(Field).use(Rate).use(Toast).use(Tab).use(Tabs).use(Collapse).use(CollapseItem).use(Lazyload).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(Popup);

FastClick.attach(document.body);   

// 入口文件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
