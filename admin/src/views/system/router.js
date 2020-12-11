import Layout from '@/components/layout/index.vue'

export default  [{
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    children: [
        {
            path: 'menu',
            component: ()=>import('./views/menu'),
        },
        {
            path: 'role',
            component: ()=>import('./views/role'),
        },
        {
            path: 'permission',
            component: ()=>import('./views/permission'),
        },
        {
            path: 'user',
            component: ()=>import('./views/user'),
        },
        {
            path: 'file',
            component: ()=>import('./views/file'),
        },
        {
            path: 'log',
            component: ()=>import('./views/log'),
        }
    ]
}]