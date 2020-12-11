<!--
 * @description     我的收藏
 *
 * @author          大侠
 * @create          2019-03-18 15:00
-->

<template>
    <div class="header-menu-item header-itil" :class="{open:hoverActive}" @mouseenter="hoverActive=true" @mouseleave="hoverActive=false">
        <a class="link">
            <i class="el-icon-star-on"></i>
            <span class="tit">我的收藏</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
        </a>
        <div class="submenu">
            <div class="menu-container">
                <div class="menu-item-box clearfix">
                    <div class="ceil" v-for="(server,i) in myMenuList" :key='i' @click="hoverActive=false">
                        <router-link class="menu-item" tag="div" :to="server.url" :class="{active: $route.path==server.url}">
                            <i :class="server.icon?server.icon:'emp'"></i>
                            <span class="name">{{server.name}}</span>
                        </router-link>
                    </div>
                    <div class="empty" v-if="!myMenuList.length">收藏空空的哦~</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'myCollection',
        data() {
            return {
                hoverActive: false
            }
        },
        created(){

        },
        computed: {
            ...mapGetters(['myMenuList']),
        }
    }
</script>

<style>
    /*display:block!important;*/
</style>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.submenu{
    background-color: transparent!important;
}
.menu-container{
    position: relative;
    height: auto;
    background:rgb(50, 50, 50);
    width: 570px;
    .menu-item-box{
        .ceil{
            width: 114px;
            height:114px;
            float: left;
            &>.menu-item{
                text-align: center;
                color:#909399;font-size: 12px;
                cursor: pointer;
                height: 100%;
                i{
                    margin: 20px 0 10px;
                    font-size: 24px;
                    &.emp + span{
                        line-height: 114px;
                    }
                }

                &:hover,&.active{
                    background-color: rgb(213, 94, 154);
                    color:#fff;
                }
                .name{
                    display: block;
                        line-height: 30px;
                }
            }
        }
        .empty{
            font-size: 12px;
            text-align: center;
            padding: 10px 0;
            color: $gray-3;
            background:rgb(50, 50, 50);
        }
    }

}

</style>