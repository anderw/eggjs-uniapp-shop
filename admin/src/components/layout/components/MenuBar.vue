<!--
 * @description     左侧菜单组件
 *
 * @author          涂重阳
 * @email           779311998@qq.com
 * @phone           18707133663
 * @create          2020-10-20 16:00
-->
<template>
    <transition name="fade-transform">
        <el-aside width="220px" class="menu-bar" :class="{'hover-open':hoverActive}">
            <MenuToggle v-if="device!='mobile'"></MenuToggle>
            <div class="main-menu">
				<el-menu :collapse="!sidebar.opened" :default-active="current.active" :id="$route.path+''" :default-openeds="current.openeds" >
                    <MenuBarItem :menus="menuList"></MenuBarItem>
                </el-menu>
            </div>
        </el-aside>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import systemApi from '@/views/system/api/'
import MenuBarItem from './MenuBarItem';
import MenuToggle  from '@/components/layout/components/MenuToggle';
export default {
    components: { MenuBarItem,MenuToggle },
    name: 'MenuBar',
    data() {
        return {
            hoveredMenu: 0,
            hoverActive: false,
            defaultActive: '',
            defaultOpeneds:[], //默认展开的菜单
            currentPath: this.$route.path,
            enterStayTime: 0,
            enterTimer: null,
            // currentIndex: this.$store.getters.sidebar.currentIndex,
            isHover:false,
            menuList:[],
            onHoverTimer:null,
            onLeaveTimer:null,
            // sidebar:{
            //     currentActive:'',
            //     currentOpeneds:''
            // }
        }
    },
    computed: {
        ...mapGetters(['sidebar','device']),
        current(){
            var urls = this.$route.path.split('/').filter(a=>a).map(a=>'/'+a);
            return {
                active: this.$route.path,
                openeds: urls.map((item,i)=>urls.slice(0,i+1).join(''))
            }
        }
    },
    mounted(){
        this.getList();
    },
    methods: {
        toggleAside() {
            this.$store.dispatch('toggleSideBar');
            this.$bus.$emit('asideToggle/change')
        },
        
        /* 通过id设置菜单 */
        getList(menuid){
            systemApi.user.menu().then(resp=>{
                let list = resp.result.map(item=>{item.isRoot=true;return item})
                list.unshift({
                    url: '/dashboard',
                    name: '概览',
                    id: Date.now()+'1',
                    icon:'',
                    isRoot: true
                })
                this.menuList = list
            }).catch(err=>{
                
            })
            
        },

    }
}
</script>
<style lang="scss">
@import '@/assets/css/variables.scss';
.menu-bar {
    position: relative;
    height: 100%;
    z-index: 1100;
    background: $theme-bg;
    transition: all .3s;
    -webkit-transition: all .3s;
    box-shadow: 0px 2px 2px #333;
	overflow: hidden;

    .main-menu{
        position: absolute;
        width: 100%;
        top: 30px;
        bottom: 0;
        background: $theme-bg;
        z-index: 10;
        overflow: auto;
		
    }
	.home-text{
		text-align: center;
		cursor: pointer;
		border-bottom: 1px solid #333;
		.link{
		   text-decoration:none;
		   color: #ccc;
		   &:hover{
		       // background-color: #303030;
		       color: #fff;
		   }
		}
		&:hover{
		    background-color: #303030;
		}
	}
    .icon-dec {
        font-size: 32px;
        height: 32px;
        line-height: 32px;
    }


    .el-menu{
        background: none;
        border:0;
        margin: 0;
        .el-menu{
            background: none;
            .el-menu-item{
                color: #999;
                font-size: 14px;
                height: 40px;
                line-height: 40px;
                &:hover{
                    background-color: rgba(0,0,0,.3);
                }
            }
        }
        .el-submenu__title,.is-active .el-submenu__title{
            color:#fff;
            overflow: hidden;
            background: none;
            i{
                color: #fff;
            }
            &:hover{
                background: rgba(0,0,0,.3);
            }
        }
        .is-opened > .el-submenu__title{
            // background: rgba(0,0,0,.3);
        }
        .el-menu-item{
            color:#fff;
            overflow: hidden;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            user-select: none;

            &:hover,&:focus{
                background: rgba(0,0,0,.3);
            }
            &.is-active,&.is-active:hover{
                background: $red-select;
                color: #fff;
            }
        }
        .el-menu-item, .el-submenu__title{
            height: 40px;
            line-height: 38px;
            font-size: 14px;
            // padding-left: 10px!important;
            min-width: 100%;
            i{
                width: 20px;
                margin-right: 5px;
                text-align: center;
            }
        }
        .el-submenu{
            .el-menu-item{
                // padding-left: 0px!important;
                // padding-right: 0px!important;
                &:hover,&:active,&:focus{
                    background: rgba(0,0,0,.3);
                }
                &.is-active,&.is-active:hover{
                    background: $red-select;
                }
            }
        }
        .tit-one{
            i{
                display: none;
                width: 20px;
                text-align: center;
            }
            i + span{
                margin-left: 5px;
            }
        }
        .text-icon{
            display: none;
            overflow: hidden;
            letter-spacing: 20px;
            padding-left: 7px;
            border: 1px solid rgba(255,255,255,.6);
            border-radius: 50%;
            width:30px!important;
            height: 30px;
            line-height: 30px;
            text-align: center;
            position: relative;
            left: 50%;
            margin-left: -15px;
            top: 5px;
            color:#eee;
        }
        &.el-menu--collapse{
            .text-icon{
                display: block;
                
            }
        }
    }
    .menu-title{
        line-height: 40px;
        color:#fff;
        font-size: 16px;
        padding: 0 0 0 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.manu-bar-submenu{
    .text-icon{
        display: none;
    }
}
</style>
