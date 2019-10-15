/*
使用 mockjs 提供 mock 数据接口
*/
import Mock from 'mockjs'
import data from './data.json'

// 返回 goods的接口
Mock.mock('/shop_goods',{code:0,data:data.goods})
// 返回 ratings 的接口
Mock.mock('/shop_ratings',{code:0,data:data.ratings})
// 返回info 的接口
Mock.mock('/shop_info',{code:0,data:data.info})

// export default   不需要向外暴露任何数据   值需要保存能执行即可