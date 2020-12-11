import axios from '@/api';
export default{
    save:(params)=>axios.post('/api/file/save',params),
    list:(params)=>axios.get('/api/file',{params}),
    remove:(id)=>axios.delete('/api/file/'+id),
    update:(params)=>axios.post('/api/file/update',params),
}