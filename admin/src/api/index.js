import axios from 'axios'
import router from '../router/index'
import store from '@/store'
// const debug = process.env.NODE_ENV !== 'production';

import { Message } from 'element-ui'
/*axios 配置*/
// axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 允许携带cookie
// axios.defaults.withCredentials = true;

/* 阻止重复提交 */
const pending = [];//声明一个数组用户存储每个ajax请求的取消函数和ajax标识
const cancelToken = axios.CancelToken;
const removePending = (config)=>{
    for(const p in pending){
        if(pending[p].url == config.url){//当前请求在数组中存在时执行函数体
            pending[p].f('cancel');//执行取消操作
            pending.splice(+p, 1);
        }
    }
};

/*http request拦截器*/
axios.interceptors.request.use(
    function(config) {

        if(['post','put','delete'].indexOf(config.method+"")>-1){
            // showFullScreenLoading();
            removePending(config);
            config.cancelToken = new cancelToken(c=>{
                const o={url: config.url||'', f: c}
                pending.push(o);
            })
        }
        const baseUrl = /^(\/api)/.test(config.url)?'':'/api';        
        config.baseURL = process.env.VUE_APP_SERVER_URL||'';
        
        config.url = baseUrl+config.url
        let token = window.localStorage.getItem("token")
        if (token) {
            //将token放到请求头发送给服务器,将tokenkey放在请求头中
            config.headers.authorization = token;    
        }

        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);
function checkStatus(status,response){
    switch (status) {
        case 401://401
            // 401 用户未登录，清空本地缓存
            if (response.data && response.data.status == 401) {
                if (router.currentRoute.path != '/login') {
                    store.dispatch('clearUser')
                    let nextUrl = router.history.pending?router.history.pending.fullPath:router.history.current.fullPath;
                    nextUrl == '/login'?nextUrl="/":false;
                    router.replace({
                        path: '/login',
                        // query: { redirect: nextUrl }
                    })
                    // return Promise.reject(error);
                }else{
                    
                }
            }
            break;
        case 402://402
            // (<any>Message).closeAll();
            router.replace({path:'/setting/license'});
            break;
        case 404:
            // return Promise.reject(error);
            break;
        case 500://500
            Message.closeAll();
            Message({
                message: response.data.message || '后台服务器错误',
                type: 'error',
                duration: 5 * 1000,
                showClose: true,
                customClass: 'zZindex'
            });
            break;
        default:
            // console.error('【后台错误】', error.response.data);
            // (<any>Message).closeAll();
            Message({
                message: response.data.message || '后台服务器错误',
                type: 'error',
                duration: 5 * 1000,
                showClose: true,
                customClass: 'zZindex'
            });
    }
}
// http response 拦截器
axios.interceptors.response.use(
    function(response) {
        // hideFullScreenLoading();
        let pass = true;
        let message = '获取数据失败';
        if(response.data.status != 200 && response.config.responseType != 'blob'){
            pass = false;
            message = response.data.message;
            checkStatus(response.data.status, response);
            return Promise.reject(response.data);
        }

        if(response.config.responseType == 'blob' && !response.data.size){
            pass = false;
            message = '文件不存在'
        }
        if(response.data.status==500 && response.data.result && (response.data.result.format ||response.data.result.repeat)){
            //这里调用错误提示面板
            return Promise.reject(response.data);
        }
        if(!pass){
            Message.closeAll();
            Message({
                message:  message ,
                type: 'error',
                duration: 15000,
                showClose: true,
            });
            return Promise.reject(response.data);
        }
        
        return response.data;
    },
    async function(error) {
        // hideFullScreenLoading();
        if (error.response) {
            if(error.response.data instanceof Blob){
                error.response.data = await error.response.data.text()
                error.response.data = JSON.parse(error.response.data)
            }
            const status = error.response.data&&error.response.data.status||error.response.status;

            checkStatus(status, error.response);
            

        }else{
            /* 取消 */
            if(error.message && error.message === 'cancel'){
                return;
            }
            // console.error('【服务器连接失败】：'+error.message);
            // (<any>Message).closeAll();
            Message({
                message: "服务器连接失败，请稍后重试",
                type: 'error',
                duration: 5 * 1000,
                showClose: true,
            })
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error);
    }
);

// const instance = axios.create({headers: {'content-type': 'application/x-www-form-urlencoded'}})
export default axios;