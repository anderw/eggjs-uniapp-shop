/**
 * @description     用户相关api接口
 *
 * @author          
 * @email           
 * @phone           
 * @create          2019-02-12 11:00
 * */

import axios from '../index';

export default{
	me:()=>axios.get('/authorize/me'),
	login:(opt)=>axios.post('/authorize/login',{token_type: 'SMART_SESSIONID',...opt}),
	logout:()=>axios.get('/authorize/login-out')
}