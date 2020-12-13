import axios from '../axios'

export default{
	list: (params)=>axios.get('/api/member/address',{params}),
	save: (opt)=>axios.post('/api/member/address/save',opt),
	remove: (id)=>axios.delete('/api/member/address/'+id),
}