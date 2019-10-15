/*封装一个接口函数*/
// 返回值是一个promise对象
import axios from 'axios'
// 环境 
// axios.defaults.baseURL ='http://localhost:8085/';   //  要请求的后台地址
// 请求超时
axios.defaults.timeout =30000;
//  post 请求头 
axios.defaults.headers.post['Content-Type'] ='application/json';
    // * get方法，对应get请求
    // * @param {String} url [请求的url地址]
    // * @param {Object} params [请求时携带的参数]

export function get(url, params){
    return new Promise((resolve, reject) =>{
    axios.get(url, {
        params: params
      }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
    })
});
}
// post方法，对应post请求
//  @param {String} url [请求的url地址]
//  @param {Object} params [请求时携带的参数]

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params,).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    });
}
// export default function ajax(url, data = {}, type = 'Get') {
//     return new Promise(function (resolve, reject) {
//         let promise
//         if (type === 'GET') {
//             // 准备url query参数数据
//             let dataStr = '' // 数据拼接字符串
//             Object.keys(data).forEach(key => {
//                 dataStr += key + '=' + data[key] + '&'
//             })
//             if (dataStr !== '') {
//                 // 这里的拼接是去掉最后一个拼接的末尾去掉&  如果是空就跳过
//                 dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
//                 url = url + '?' + dataStr
//             }
//             // 发送get请求
//             promise = axios.get(url)
//         } else {
//             // 发送post请求
//             promise = axios.post(url, data)
//         }
//         promise.then(response => {
//                 resolve(response.data);
//             })
//             .catch(error => {
//                 reject(error)
//             })
//     })
// }