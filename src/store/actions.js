/*
通过mutation间接更新state的多个方法的对象
 */
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
import {
    reqAddress,
    reqFoodCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopInfo,
    reqShopRatings,
    reqShopGoods,
    reqSearchShop
    // increment_food_count,
    // decrement_food_count
} from '../api'
export default{
    // 异步获取地址的action
    async getAddress({commit,state}){
        // 发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        // 提交一个mutation 
        if(result.code === 0){
            const address = result.data
            commit(RECEIVE_ADDRESS,{address})
        }
    },
    // 异步获取食品分类列表
    async getFoodCategorys({commit}){
        // 发送异步ajax请求
        const result = await reqFoodCategorys()
        // 提交一个mutation 
        if(result.code === 0){
            const categorys = result.data
            commit(RECEIVE_CATEGORYS,{categorys})
        }
    },
    // 异步获取商家列表
    async getShops({commit,state}){
        // 发送异步ajax请求
        const {longitude,latitude} = state
        const result = await reqShops(longitude,latitude)
        // 提交一个mutation 
        if(result.code === 0){
            const shops = result.data
            commit(RECEIVE_SHOPS,{shops}) 
        }
    },
    // 同步记录用户信息
    recordUser({commit},userInfo){
        commit(RECEIVE_USER_INFO,{userInfo})
    },

    // 异步获取用户信息
    async getUserInfo({commit}){
        const result = await reqUserInfo()
        if(result.code === 0){
            const userInfo = result.data
            commit(RECEIVE_USER_INFO,{userInfo})
        }
    },

    // 异步登出
    async loginOut({commit}){
        const result = await reqLogout()
        if(result.code === 0){
            commit(RESET_USER_INFO);
        }
    },
    // 异步获取商家信息
    async getShopInfo({commit}){
        const result = await reqShopInfo()
        if(result.code === 0){
            const info = result.data
            commit(RECEIVE_INFO,{info})
        }
    },
    // 异步获取商家评价列表
    async getShopRatings({commit},callback){
        const result = await reqShopRatings()
        if(result.code === 0){
            const ratings = result.data
            commit(RECEIVE_RATINGS,{ratings})
            //数据更新
            callback && callback()
        }
    },
    // 异步获取商品列表
    async getShopGoods({commit},callback){
        const result = await reqShopGoods()
        if(result.code === 0){
            const goods = result.data
            commit(RECEIVE_GOODS,{goods})
            // 数据更新了  可以用watch去通知  如果自己来通知
            callback && callback()
        }
    },
    // 异步搜索关键字的商家列表
    async searchShops({commit,state},keyword){
        // 发送异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchShop({geohash,keyword})
        // 提交一个mutation 
        if(result.code === 0){
            const searchShops = result.data
            commit(RECEIVE_SEARCH_SHOPS,{searchShops})
        }
    },

    // 同步更新food 中的 count值
    updateFoodCount({commit},{isAdd,food}){
        if(isAdd){
            commit(INCREMENT_FOOD_COUNT,{food})
        }else{
            commit(DECREMENT_FOOD_COUNT,{food})
        }
    },

    // 同步清空购物车
    clearCart({commit}){
        commit(CLEAR_CART)
    },
    // 同步清除 搜索列表
    clear_search_shops({commit}){
        commit(CLEAR_SEARCH_SHOPS)
    },

    shoptab({commit},{name}){
        commit(SHOPS_TAB,{name})
    },
}