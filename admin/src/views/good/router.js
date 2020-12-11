import Layout from '@/components/layout/index.vue'

export default  [{
    path: '/good',
    component: Layout,
    redirect: '/good/list',
    children: [
        {
            path: 'list',
            component: ()=>import('./views/list'),
        },
        {
            path: 'list/create',
            component: ()=>import('./views/list/edit'),
        },
        {
            path: 'category',
            component: ()=>import('./views/category'),
        },
    ]
}]