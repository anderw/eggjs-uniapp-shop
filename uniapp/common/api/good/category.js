import axios from '../axios'

export default{
	list: (params)=>axios.get('/api/goodCategory',{params}),
	tree: (params)=>axios.get('/api/goodCategory/tree',{params}),
	save: (opt)=>axios.post('/api/goodCategory/save',opt),
	remove: (id)=>axios.delete('/api/goodCategory/'+id),
}