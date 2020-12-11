import Layout from '@/components/layout/index.vue'

export default  [{
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/merchant',
    children: [
        {
            path: 'merchant',
            component: ()=>import('./views/merchant'),
        },
    ]
}]