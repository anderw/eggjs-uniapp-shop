import Layout from '@/components/layout/index.vue'

export default  [{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
        {
            path: '/dashboard',
            component: ()=>import('./views/index'),
        },
    ]
}]