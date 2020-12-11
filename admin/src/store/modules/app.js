import Cookies from 'js-cookie'
import router from '@/router'
import systemApi from '@/views/system/api';
import {time} from '@/filters';
const app = {
    state: {
        sidebar: {
            opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
            withoutAnimation: false,
            hidden: false,//是否完全隐藏左侧菜单
        },
        device: 'desktop',
        theme: Cookies.get('theme') || 'black',
        baseUrl: process.env.VUE_APP_SERVER_URL||''
    },
    mutations: {
        //设置左侧菜单栏收起与展开
        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
        },
        //关闭左侧菜单栏
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 0)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        //完全显示左侧菜单栏
        SHOW_SIDEBAR:(state,withoutAnimation)=>{
            state.sidebar.hidden = false;
            state.sidebar.withoutAnimation = withoutAnimation
        },
        //完全隐藏左侧菜单栏
        HIDE_SIDEBAR:(state,withoutAnimation)=>{
            state.sidebar.hidden = true;
            state.sidebar.withoutAnimation = withoutAnimation
        },
        
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },
        SET_THEME: (state, theme) => {
            state.theme = theme;
            document.getElementsByTagName("body")[0].className="theme-"+theme;
            Cookies.set('theme', theme);
        },
        
        SET_BASE_URL: (state, url) => {
            state.baseUrl = url
        },
        
        
    },
    actions: {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDEBAR')
        },
        closeSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        showSideBar({commit},{ withoutAnimation }){
            commit('SHOW_SIDEBAR',withoutAnimation)
        },
        hideSideBar({commit},{ withoutAnimation }){
            commit('HIDE_SIDEBAR',withoutAnimation)
        },
        toggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        },
        setTheme({ commit }, theme) {
            commit('SET_THEME', theme)
        },
        setBaseUrl({ commit },url) {
            commit('SET_BASE_URL',url)
        },
    }
}

export default app