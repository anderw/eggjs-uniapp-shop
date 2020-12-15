import axios from '../axios'

export default{
	list: (params)=>axios.get('/api/order',{params}),
	save: (opt)=>axios.post('/api/order/save',opt),
	remove: (id)=>axios.delete('/api/order/'+id),
	cancel: (id)=>axios.post('/api/order/cancel/'+id),
}