<!--
 * @description     头部公共组件
 *
 * @author          涂重阳
 * @email           779311998@qq.com
 * @phone           18707133663
 * @create          2019-02-20 16:00
-->
<template>
    <el-header class="header-bar" height="50px">
        <!-- <div class="logo"><router-link to="/"><img src="../../../assets/images/logo.png"></router-link></div> -->
        <div class="header-menu right">
            <!-- <div class="header-menu-item header-item-question">
                <a href="javascript:;" class="link">
                    <i class="ico-common ico-common-question"></i>
                </a>
            </div>
            <message-list /> -->
			<MessageIco/>
            <!-- <lang-select /> -->
            <user-info />
        </div>
        <div class="header-menu left">
            <div class="header-menu-item header-item-logo">
                <router-link to="/" class="link">后台管理系统</router-link>
            </div>
            <div class="header-menu-item header-avatar" v-if="!is_debug">
                <a class="link" href="/">
                    <i class="el-icon-back"></i>
                    <span class="tit">返回云账台</span>
                </a>
            </div>
            <!-- <ServiceMenu></ServiceMenu> -->
            <!-- <MyCollection></MyCollection> -->
            <!-- <NavCustom></NavCustom> -->
        </div>
    </el-header>
</template>
<script>
import {mapGetters} from 'vuex'
import LangSelect from './LangSelect'
import UserInfo from './UserInfo'
import MessageIco from './MessageIco'

export default {
    components: { LangSelect,UserInfo,MessageIco},
    name: 'HeaderBar',
    created() {
    },
    data() {
        return {
            /* 标识是否本地测试环境 */
            is_debug: process.env.NODE_ENV !== 'production'
        }
    },
    computed: {
        ...mapGetters([]),
        menuMode() {
            return this.$store.state.app.device == 'mobile' ? 'vertical' : 'horizontal';
        },
        menuCollapse() {
            return this.$store.state.app.device == 'mobile' ? true : false;
        }
    },
    methods: {

    }
}
</script>
<style lang="scss">
@import '@/assets/css/variables.scss';

.header-bar {
    background: $theme-bg;
    color: #eee;
    position: relative;
    z-index: 1110;
    padding: 0!important;
    .logo {
        margin-top: 14px;
        float: left;
        margin-right: 20px;

        img {
            vertical-align: middle;
        }

        .tit {
            vertical-align: middle;
            margin-left: 20px;
        }
    }

    .header-menu {
        float: right;
        height: 100%;
        line-height: 50px;
        &.left{
            float: left;
        }
        &.right{
            float: right;
        }
        .header-menu-item {
            display: inline-block;

            height: 100%;
            font-size: 18px;
            color: $gray-2;
            vertical-align: text-bottom;
            position: relative;
            margin-right: -1px;
            .el-badge {
                line-height: 1;

                .el-badge__content {
                    border: 0;
                    height: 16px;
                    line-height: 16px;
                    padding: 0 5px;
                }
            }
            &:before{
                content: "";
                width: 1px;
                height: 20px;
                top: 50%;
                margin-top: -10px;
                background: $black-dark;
                position: absolute;
                display: block;
                left: 100%;
                margin-left: -1px;
            }
            &:last-child:before{
                display:none
            }
            &.open {
                background: $black-dark;
                color: #fff;
                .submenu{
                    transform: translateY(0);
                    -webkit-transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }
                .link{
                    .el-icon--right{
                        transform: rotate(180deg);
                        -webkit-transform: rotate(180deg);
                    }
                }
            }
            .el-dropdown{
                vertical-align: top;
                color: inherit;
            }
            .link{
                padding: 0 10px;
                font-size: 14px;
                display: block;
                cursor: pointer;
                text-align: center;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                color:#ccc;
                text-decoration: none;
                i,span{
                    vertical-align: middle;
                }
                i + span{
                    margin-left: 5px;
                }
                .el-icon--right{
                    font-size: 12px;
                    transition: all .3s;
                    -webkit-transition: all .3s;
                }
            }
            .submenu{
                background-color: $black-dark;
                position: absolute;
                top: 100%;
                left: 0;
                min-width: 100%;
                opacity: 0;
                visibility: hidden;
                overflow: auto;
                transform: translateY(-20px);
                -webkit-transform: translateY(-20px);
                transition: all .3s;
                -webkit-transition: all .3s;
                transition-delay: .3s;
                .submenu-item{
                    text-align: center;
                    line-height: 20px;
                    a{
                        color: $gray-2;
                        font-size: 13px;
                        text-decoration: none;
                        display: block;
                        padding: 10px 0;
                        &:hover{
                            background-color: $black-light;
                        }
                        &[disabled],&[disabled]:hover{
                            cursor: default;
                            color: $red-select;
                            background: none;
                        }
                        &.active{
                            color: $red-select;
                        }
                        i{
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
        .header-item-logo{
            padding: 0 20px;
            .link{
                font-size: 18px;
            }
            img{
                vertical-align: middle;
                height: 30px;
                width: auto;
            }
        }
        .header-item-question{
            &:before{
                display: none;
            }
        }
        .header-itil{
            min-width: 80px;
        }

    }


}


</style>
