import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';
Vue.use(VueRouter)

const routes = [
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
var isAdd = false;
var initDynamicRouters = function(callback){
    if(isAdd){
        callback && callback();
        return;
    }
    /* 根据env配置文件，动态加载路由 */
    Promise.all(
        process.env.VUE_APP_MODULE && process.env.VUE_APP_MODULE.split(',').map(item=>{
            return import('@/views/'+item+'/router')
        })
    ).then(modules=>{
        modules.forEach((module)=>{
            router.options.routes = [...module.default,...router.options.routes]
            router.addRoutes(module.default)
        })
        /* 添加404路由，必须加在路由最后面 */
        let notfoundRoute = [{
            path: '*',
            component: ()=>import('@/components/layout/index.vue'),
            children: [{
                path: '',
                component: () => import('@/views/errorPage/404.vue'),
                hidden: true
            }]
        }]
        router.options.routes = [...router.options.routes,...notfoundRoute]
        router.addRoutes(notfoundRoute);
        callback && callback();
        isAdd=true;
    })
}
initDynamicRouters();

router.beforeEach((to, from, next) => {
    const whiteList = ['/login','/401','/404','/403','/signup'] // 不需要重定向白名单
    // next();return;//暂时去掉登录拦截
    if (whiteList.indexOf(to.path) != -1 || to.path.indexOf('login')>-1) { // 在免登录白名单，直接进入
        next()
    } else {
        if (!store.getters.user.id) { // 判断页面是否刷新
            store.dispatch('GetUserInfo',true).then(() => {// 拉取user_info
                next({
                    path: to.path,
                    query: to.query,
                    params: to.params,
                    replace: true
                })
                
            }).catch(() => {
                let path = '/login'
                next({
                    path: path,
                    query: { redirect: to.fullPath },
                    replace: true
                })
            })
        } else {
            next()
        }
    }
    // eslint-disable-next-line no-console
    
})
router.afterEach(() => {
    
});

export default router
