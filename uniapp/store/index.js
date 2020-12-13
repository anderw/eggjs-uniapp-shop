import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		user: {},
		token: '',
		baseUrl: 'http://localhost:7001',
		merchantId: 1
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.user = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		logout(state) {
			state.hasLogin = false;
			state.user = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		},
		setToken(state,token){
			state.token = token
			uni.setStorage({
			    key: 'token',  
			    data: token  
			}) 
		}
	},
	actions: {
	
	}
})

export default store
