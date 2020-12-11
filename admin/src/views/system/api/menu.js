import axios from '@/api';
export default{
    tree:(params)=>axios.get('/api/menu/tree',{params}),
    list:(params)=>axios.get('/api/menu',{params}),
    select:(params)=>axios.get('/api/menu/list',{params}),
    save:(opt)=>axios.post('/api/menu/save',opt),
    remove:(id)=>axios.delete('/api/menu/'+id),
}