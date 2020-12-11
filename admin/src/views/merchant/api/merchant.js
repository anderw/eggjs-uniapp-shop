import axios from '@/api';
export default{
    save:(params)=>axios.post('/api/merchant/save',params),
    list:(params)=>axios.get('/api/merchant',{params}),
    remove:(id)=>axios.delete('/api/merchant/'+id),
    update:(params)=>axios.post('/api/merchant/update',params),
}