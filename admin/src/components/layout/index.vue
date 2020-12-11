<template>
    <div class="page-container" :class="classObj">
        <el-container direction="vertical">
            <HeaderBar></HeaderBar>
            <!-- <Breadcrumb></Breadcrumb> -->
            <el-main>
                <el-container direction="horizontal">
                    <div class="menu-toggle-mobile" @click="toggleMenuBar"><i class="el-icon-menu"></i></div>
                    <MenuBar v-if="!sidebar.hidden"></MenuBar>
                    <el-main>
                        <!-- <transition name="fade-transform" mode="out-in" v-if="!$route.meta.noCache">
                            <keep-alive>
                                <router-view></router-view>
                            </keep-alive>
                        </transition> -->
                        <!-- <transition name="fade-transform" mode="out-in" v-else> -->
                            <router-view></router-view>
                        <!-- </transition> -->
                    </el-main>
                </el-container>

            </el-main>
        </el-container>
    </div>
</template>
<script>
import HeaderBar from './components/HeaderBar';
import MenuBar from './components/MenuBar';
// import Breadcrumb from './components/Breadcrumb';
import { mapGetters } from 'vuex';
import ResizeMixin from './mixin/ResizeHandler';

export default {
    name: 'layout',
    data() {
        return {
            menuBarShow: false
        }
    },
    mixins: [ResizeMixin],
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        sidebar() {
            return this.$store.state.app.sidebar
        },
        device() {
            return this.$store.state.app.device
        },
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile',
                menuBarShow:this.menuBarShow
            }
        }
    },
    watch:{
        $route(){
            this.menuBarShow = false
        }
    },
    created() {

    },
    methods: {
        toggleMenuBar() {
            this.menuBarShow = !this.menuBarShow
        }
    },
    components: { HeaderBar,MenuBar }
}
</script>
<style lang="scss">
@import '@/assets/css/variables.scss';
#_browser_check_ +  .page-container >.el-container{
    height: calc( 100vh - 27px )
}
#_browser_check_ + .page-container > .el-container .el-container{
    height: calc(100vh - 77px);
}
.page-container {
    &>.el-container {
        height: 100vh;
        overflow: hidden;

        .el-container {
            height: calc(100vh - 50px);
            height: -webkit-calc(100vh - 50px);
            height: -moz-calc(100vh - 50px);
            height: -o-calc(100vh - 50px);
        }
    }




    .el-main {
        padding: 0;
    }


    &.hideSidebar {
        .aside-bar {
            width: 60px !important;
        }
        .sub-header-bar{
            .aside-toggle {
                i {
                    &:before{
                        content: "\f03c"
                    }
                }
            }
        }
        .menu-bar{
            width: 64px!important;
            overflow: visible;
            .sub-menu{
                opacity: 0;
                visibility: hidden;
                transform: translateX(-20px);
                -webkit-transform: translateX(-20px);
            }
            &.hover-open{
                .sub-menu{
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(0);
                    -webkit-transform: translateX(0);
                }
            }
        }

    }
    &.mobile{
        .menu-bar{
            position: fixed;
            top: 90px;
            transform: translateX(-100%);
            transition: transform .3s!important;
        }
        .sub-header-bar{
            padding-left: 40px;
        }
    }
    &.mobile.menuBarShow{
        .menu-bar{
            transform: translateX(0);
        }
    }
    .menu-toggle-mobile{
        position: absolute;
        left:0;top: 50px;
        z-index: 20;
        height:40px;
        width:40px;line-height:40px;text-align: center;
        background: $red-select;
        color:#fff;
    }

    .center-main {
        padding: 20px;

        transition: all .3s;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -o-transition: all .3s;
    }
    /*禁止动画*/
    &.withoutAnimation{
        .menu-bar{
            transition: none;
        }
    }
}

/* 二级导航 */
.sub-header-bar,.el-header.sub-header-bar{
    padding: 0;
    box-shadow: $boxShadow;
    background: $gray-5;
    border-bottom: 1px solid $gray-3;
    color: $black-pale;
    position: relative;
    &.white{
        background: white;
    }
    &:after{
        clear: both;
        content: "";
        display: block;
    }
    & + .el-main{
        .tab-pane-content{
            max-width: 600px;
            margin: 0 auto;
        }
    }
    .back{
        color: $red-select;
        margin-right: 5px;
        i{
            margin-right: 5px;
        }
    }
    .sub-header-title{
        line-height: 40px;
        padding:0 15px;
        z-index: 10;
        position: relative;
        margin-right: 50%;
    }
    .sub-header-main{
        text-align: center;
        width: 100%;
        height: 40px;line-height: 40px;
        left: 0;top: 0;
        position: absolute;
    }
    .el-menu{
        border: 0;
        float: left;
        background: none;
    }
    .el-menu--horizontal>.el-menu-item{
        height: 40px;
        line-height: 40px;
        margin: 0 15px;
        padding: 0;
        &.is-active{
            border-bottom-color: $base-color;
        }
        &:hover{
            background: none;
        }
        >div{
            // padding: 0 20px;
            cursor: pointer;
        }
    }
    .btn-right,.btn-refresh{
        float: right;
        margin-right: 10px;
        padding-top: 12px;
        position: relative;
        z-index: 20;
    }
    .btn-back{
        float: left;
        line-height: 40px;
        padding: 0 10px;
        border: 0;
        font-size: 12px;
    }
    .aside-toggle{
        float: left;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #909399;
        position: relative;
        margin-right: 10px;
        z-index: 10;
        &:hover{
            background: rgba(0,0,0,.1);
        }
        &:after{
            content: "";
            display: block;
            width: 1px;
            top: 10px;
            bottom: 10px;
            background: rgba(0,0,0,.1);
            position: absolute;
            right: 0;
        }
        & + .sub-header-title{
            margin-left: 40px;
        }
    }
    .el-tabs{
        border-top: 1px solid $gray-3;
        .el-tabs__header{
            text-align: center;
            margin: 0;
            .el-tabs__nav-wrap:after{
                display: none;
            }
        }
        .el-tabs__nav{
            float: none;
            display: inline-block;
        }
        .el-tabs__item{
            color: #CCCCCC;
            &.is-active{
                color: #D55E9A;
            }
        }
        .el-tabs__active-bar{
            background-color: #D55E9A;
        }
    }

}


</style>
