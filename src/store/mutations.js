/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    SHOPS_TAB,
    RECEIVE_SEARCH_SHOPS,
    CLEAR_SEARCH_SHOPS
    
} from './muttion-types'
export default {
    [RECEIVE_ADDRESS](state, {
        address
    }) {
        state.address = address
    },
    [RECEIVE_CATEGORYS](state, {
        categorys
    }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, {
        shops
    }) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state, {
        userInfo
    }) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },
    [RECEIVE_GOODS](state, {
        goods
    }) {
        state.goods = goods
    },
    [RECEIVE_RATINGS](state, {
        ratings
    }) {
        state.ratings = ratings
    },
    [RECEIVE_INFO](state, {
        info
    }) {
        state.info = info
    },

    [INCREMENT_FOOD_COUNT](state, {
        food
    }) {
        if (!food.count) { // 第一次增加
            // 问题 跟新状态数据，对应的界面不变化
            // 原因 一般方法给一个已有绑定的对象中添加一个新的属性，这个属性没有数据绑定
            // food.count = 1  // 新增属性（没有数据绑定）
            Vue.set(food, 'count', 1)  // Vue-给对象新增属性(使用Vue.$set())  让新增的属性也有数据绑定
            // 将food添加到cartFoods       这里产生一个疑问  假如 a b 都操作一个对象  a 通过条件改变数据 b也能看到，假如出现这种情况  a b 操作同一个对象 但是  a操作原来对象但是不想让他改变 那就需要重新创建一个对象进行操作
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT](state, {
        food
    }) {
        if (food.count) {
            food.count--
            if(food.count === 0){
                // 将food从cartFoods中移除
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
        }
    },
    [CLEAR_CART](state){
        // 清湖food中的count
        state.cartFoods.forEach(food => food.count = 0)
        // 清除购物车中所有购物项
        state.cartFoods = []
    },
    [CLEAR_SEARCH_SHOPS](state){ // 清除搜索列表
        state.searchShops = []
    },
    [SHOPS_TAB](state,{
        name
    }){
            state.shopsTab = name
    },
    [RECEIVE_SEARCH_SHOPS](state, {
        searchShops
    }) {
        state.searchShops = searchShops
    },
    

}