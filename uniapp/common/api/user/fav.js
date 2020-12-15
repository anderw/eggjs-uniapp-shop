import axios from '../axios'

export default{
	list: (params)=>axios.get('/api/member/fav',{params}),
	save: (opt)=>axios.post('/api/member/fav/save',opt),
	remove: (id)=>axios.delete('/api/member/fav/'+id),
}