import Layout from '@/components/layout/index.vue'

export default  [{
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    children: [
        {
            path: 'list',
            component: ()=>import('./views/list'),
        },
    ]
}]