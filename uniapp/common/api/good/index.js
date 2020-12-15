import axios from '../axios'
import category from './category'
export default{
	category,
    list: (params)=>axios.get('/api/good',{params}),
    detail: (id)=>axios.get('/api/good/'+id)
}