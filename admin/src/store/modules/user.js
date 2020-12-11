import systemApi from '@/views/system/api';
import Cookies from 'js-cookie'
const user = {
    state: {
        user: {},
    },

    mutations: {
        SET_USER: (state, user) => {
            state.user = user
            localStorage.setItem('currentUser',JSON.stringify(user));
        },
    },

    actions: {

        // 获取用户信息,refresh为true时，从后台获取数据
        GetUserInfo({ dispatch,commit, state },refresh) {
            
            return new Promise((resolve, reject) => {
                if(refresh){
                    systemApi.user.info().then((response,error) => {
                        if(!response){ reject();return ;}
                        commit('SET_USER', response.result);
                        Cookies.set('currentUser',response.result.id);
                        resolve(response)
                    }).catch(error => {
                        console.log(error,'error')
                        reject(error)
                    })

                }else{
                    let currentUserId = Cookies.get('currentUser');
                    let currentUser = localStorage.getItem('currentUser');
                    if(currentUserId && currentUser){
                        currentUser = JSON.parse(currentUser);
                        commit('SET_USER', currentUser);
                        resolve({result:currentUser});
                    }else{
                        reject()
                    }
                }
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                systemApi.user.logout(state.token).then(() => {
                    commit('SET_USER', {});
                    Cookies.remove('currentUser');
                    localStorage.removeItem('currentUser');
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        clearUser({ commit, state }){
            commit('SET_USER', {});
            Cookies.remove('currentUser');
            localStorage.removeItem('currentUser');
        },

    }
};

export default user