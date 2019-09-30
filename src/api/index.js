/* 
    包含 n 个接口请求函数的模块
*/
// 引入封装好的 axios
import axios from './ajax.js'
import ajax from './ajax.js'

// 根据经纬度获取位置
export const reqAddress = (geohash) => axios(`/position/${geohash}`);
// 获取食品分类列表
export const reqFoodTypes = () => ajax('/index_category');
// 获取商铺列表   这里传的是经纬度 为了直传一个  所以用{} 包裹成对象
export const reqShopList = (longitude,latitude) => ajax('/shops',{longitude,latitude});