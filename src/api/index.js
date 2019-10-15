/* 
    包含 n 个接口请求函数的模块
*/
// 引入封装好的 axios
import {get,post} from './ajax.js'

// const BASE_URL = 'http://localhost:4000'
// const BASE_URL = '/api'

// 根据经纬度获取位置
export const reqAddress = data => get("api/position/" + data);
// 获取食品分类列表
export const reqFoodCategorys = () => get("api/index_category");
// 获取商铺列表   这里传的是经纬度 为了直传一个  所以用{} 包裹成对象
export const reqShops = data => get("api/shops",data);
// 根据金纬度和关键字搜索商铺列表
export const reqSearchShop = data => get("api/search_shops",data);
// 用户名密码登录
export const reqPwdLogin = data => post("api/login_pwd",data);
// 发送短信验证码
export const reqSendCode = (phone)=> get("api/sendcode",{phone})
// 手机号验证码登录
export const reqSmsLogin = data => post("api/login_sms",data)
// 根据会话获取用户信息
export const reqUserInfo = () => get("api/userinfo")
// 用户登出
export const reqLogout = () => get("api/logout")


// 模拟数据
// 获取商家信息
export const reqShopInfo = () => get('/shop_info')
// 获取商家评价数组
export const reqShopRatings = () => get('/shop_ratings')
// 获取商家商品数组
export const reqShopGoods = () => get('/shop_goods')