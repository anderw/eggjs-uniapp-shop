import axios from '@/api';
export default{
    save:(params)=>axios.post('/api/good/save',params),
    list:(params)=>axios.get('/api/good',{params}),
    remove:(id)=>axios.delete('/api/good/'+id),
    update:(params)=>axios.post('/api/good/update',params),
}