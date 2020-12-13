import axios from '@/api';
export default{
    save:(params)=>axios.post('/api/goodCategory/save',params),
    select:(params)=>axios.get('/api/goodCategory/list',{params}),
    list:(params)=>axios.get('/api/goodCategory',{params}),
    tree:(params)=>axios.get('/api/goodCategory/tree',{params}),
    remove:(id)=>axios.delete('/api/goodCategory/'+id),
    update:(params)=>axios.post('/api/goodCategory/update',params),
}