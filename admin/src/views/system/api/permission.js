import axios from '@/api';
export default{
    list:(params)=>axios.get('/api/permission',{params}),
    select:(params)=>axios.get('/api/permission/list',{params}),
    save:(opt)=>axios.post('/api/permission/save',opt),
    remove:(id)=>axios.delete('/api/permission/'+id),
}