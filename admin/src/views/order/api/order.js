import axios from '@/api';
export default{
    save:(params)=>axios.post('/api/order/save',params),
    list:(params)=>axios.get('/api/order',{params}),
    detail:(id)=>axios.get('/api/order/'+id),
    remove:(id)=>axios.delete('/api/order/'+id),
    update:(params)=>axios.post('/api/order/update',params),
}