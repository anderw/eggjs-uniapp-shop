import Layout from '@/components/layout/index.vue'

export default  [{
    path: '/setting',
    component: Layout,
    redirect: '/setting/person',
    children: [
        {
            path: 'person',
            component: ()=>import('./views/person'),
        },
        {
            path: 'shop',
            component: ()=>import('./views/shop'),
        },
    ]
}]