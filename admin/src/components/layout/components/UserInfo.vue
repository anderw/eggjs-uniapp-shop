<template>
	<div class="header-menu-item header-avatar" :class="{open:hoverActive}" @mouseover="hoverActive=true" @mouseout="hoverActive=false">
		<a class="link">
			<i class="ico-avatar-gray"></i>
            <span class="tit">{{user.name||user.username}}</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
        </a>
        <div class="submenu">
            <div class="content">
                <el-row>
                    <el-col :span="6" class="tit">姓名:</el-col>
                    <el-col :span="18" class="txt">{{user.name}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tit">用户名:</el-col>
                    <el-col :span="18" class="txt" style="text-overflow: unset;white-space:normal;">{{user.username}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6" class="tit">角色:</el-col>
                    <el-col :span="18" class="det">
                        <p v-if="user.role"><span class="role role-1">{{user.role.name}}</span><!-- &nbsp;&nbsp;<i class="el-icon-question"></i> --></p>
                    </el-col>
                </el-row>
            </div>
            <div class="foot">
                <el-button type="text" icon="fa fa-gear" class="set" @click="routeTo('/setting/person')">设置</el-button>
                <el-button type="text" icon="fa fa-sign-out" class="exit" @click="logout()">退出登录</el-button>
            </div>
        </div>      
        <!-- <userApplication v-if="visible" :visible.sync="visible" @updateStatus='getStatus' ></userApplication> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import userApplication from './userApplication'
export default{
    components: {},
	name:'UserInfo',
    data(){
        return {
            hoverActive: false,
            loading:false,
            tenantName:'',
            visible:false,
            tenantStatus:null,
            fullLoading: {}
        }
    },
	computed: {
        ...mapGetters([
            'user',
        ]),
    },
    created(){
        
        
    },
    methods:{
        application(){
            this.visible = true
            
        },
        routeTo(path) {
            this.$router.push(path);
        },
        onMouseenter(){
            if(this.loading) return;
            this.loading=true;
            this.$store.dispatch('GetUserInfo',true).then(()=>{
                this.loading=false;
            }).catch(()=>{
                this.loading=false;
            })
        },
        getUserInfo(){

        },
        logout() {
            this.fullLoading = this.$loading({
                lock: true,
                text: '退出登录中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$store.dispatch('LogOut').then(() => {
                // let nextUrl = this.$router.history.pending?this.$router.history.pending.path:this.$router.history.current.path;
                // nextUrl == '/login'?nextUrl="":false;
                this.$router.replace({
                    path: '/login',
                    // query: { redirect: nextUrl }
                })
            }).finally(()=>{
                this.fullLoading.close();
            })
        },
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.header-avatar{
    .link{
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .ico-avatar-gray{
            font-size: 25px;
        }
    }
	.submenu{
		width: 320px;
		left: auto!important;
		right: 0;
		.content{
			padding: 10px 20px;
			line-height: 28px;
			font-size: 12px;
            .tit{
                text-align: right;
            }
            .txt{
                padding-left: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .det{
                padding-left: 10px;
            }
            .role{
                // background: $red-select;
                // color: #fff;
                display: inline-block;
                padding: 0 10px;
                // text-align: center;
                line-height: 20px;
                margin-bottom: 5px;
                margin-right: 5px;
                word-break: break-word;
            }
            .el-row{
                margin: 4px 0;
            }
		}
		.foot{
            font-size: 0;
            text-align: center;
            line-height: 1;
			.el-button{
				width: 50%;
                display: inline-block;
				margin:0;
				border:0;
				color: $gray-2;
				border-radius:0;
                line-height: 20px;
                font-size: 12px;
                /deep/ i{
                    margin-right: 5px;
                }
				&:hover{
					background-color: $black-light;
                    &.exit{
                        color: $red-select;
                    }
				}
			}
			&:after{
				content: "";
				display: block;
				clear: both;
			}
		}
	}
}
</style>