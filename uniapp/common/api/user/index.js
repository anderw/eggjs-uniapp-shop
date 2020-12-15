import axios from '../axios'
import address from './address'
import order from './order'
import fav from './fav'
export default{
	login: (opt)=>axios.post('/api/user/login',opt),
	info: ()=>axios.get('/api/user/info'),
	update: (opt)=>axios.post('/api/user/update',opt),
	address,
    order,
    fav
}