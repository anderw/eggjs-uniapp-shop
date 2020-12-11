import axios from '@/api';
export default{
    login:(params)=>axios.post('/api/user/login',params),
    logout:()=>axios.get('/api/user/logout'),
    save:(params)=>axios.post('/api/user/save',params),
    info:()=>axios.get('/api/user/info'),
    list:(params)=>axios.get('/api/user',{params}),
    remove:(id)=>axios.delete('/api/user/'+id),
    detail:(id)=>axios.get('/api/user/detail/'+id),
    update:(params)=>axios.post('/api/user/update',params),
    menu:()=>axios.get('/api/user/menu'),
}