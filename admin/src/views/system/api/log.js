import axios from '@/api';
export default{
    list:(params)=>axios.get('/api/system/reqlog',{params}),
    select:(params)=>axios.get('/api/system/reqlog/list',{params}),
    save:(opt)=>axios.post('/api/system/reqlog/save',opt),
    remove:(id)=>axios.delete('/api/system/reqlog/'+id),
}