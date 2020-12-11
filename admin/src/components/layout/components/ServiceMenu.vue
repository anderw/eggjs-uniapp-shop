<!--
 * @description     服务菜单
 *
 * @author          大侠
 * @create          2019-03-18 15:00
-->

<template>
    <el-menu class="service-menu header-menu-item" mode="horizontal"
             :default-active="'1'" ref="serviceMenu">
        <el-submenu index="1" popper-class="service-submenu">
            <template slot="title">
                <i class="icon el-icon-menu"></i>
                <span class="tit">服务目录</span>
            </template>

            <div class="menu-container">
                <!-- 搜索服务菜单 -->
                <div class="menu-search-box">
                    <el-input label="检索模块关键字"
                              v-model="searchCondition" @input="searchServiceMenu()">
                        <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
                    </el-input>
                </div>

                <!-- 服务目录 -->
                <div class="menu-item-box clearfix" style="overflow-y: auto;">
                    <!-- 分割线 -->
                    <!--<div class="menu-line" v-if="viewMenus.length > 1"></div>-->

                    <!-- 菜单项 -->
                    <div class="waterfall-container" v-if="viewMenus.length > 0">
                        <template v-for="(parent, i) in viewMenus" >
                            <template  v-for="(service, index) in parent.children" >

                                <!-- 瀑布流布局 新 start -->
                                <div class="waterfall-item" :key='service.id' v-if="service.type != 1"
                                     style="margin-bottom: 20px; padding: 10px;">
                                    <div class="main-title">
                                        <i :class="service.icon"></i>
                                        <span>{{ service.name }}</span>
                                    </div>

                                    <div class="menu-item"
                                         v-for="(item, cInd) in service.children" :key='cInd'
                                         @click.stop="goService(item)">
                                        <span>{{ item.name }}</span>
                                        <i :class="[isCollected(item) ? 'el-icon-star-on' : 'el-icon-star-off']"
                                           :title="[isCollected(item) ? '取消收藏' : '添加到【我的收藏】，方便快速访问']"
                                           @click.stop="AddToMyCollection(i, index, cInd)"></i>
                                    </div>
                                </div>
                                <!-- 瀑布流布局 新 end -->

                            </template>
                        </template>
                    </div>

                    <!-- 没有服务目录的展示 -->
                    <div class="scrollbar-wrapper" v-else>
                        <div class="no-content">{{ "暂无服务" }}</div>
                    </div>
                </div>
            </div>

        </el-submenu>
    </el-menu>
</template>



<script>

    import { deepClone } from '@/utils/index';
    import { mapGetters } from 'vuex';



    export default {
        name: 'serviceMenu',

        computed: {
            ...mapGetters(['myMenuList', 'serviceMenus'])
        },

        data() {
            return {
                viewMenus           : [],               // 服务目录菜单
                searchCondition     : '',               // 要搜索的关键字
            }
        },

        created() {
            this.$store.dispatch('getMyMenu');          // 获取我的收藏列表
            this.initMenuList();                        // 初始化服务目录菜单
        },

        methods: {

            /* 添加 | 取消收藏 */
            AddToMyCollection(i, j, k) {
                let t = this;
                let menu = t.viewMenus[i].children[j].children[k];                  // 找到当前点击的菜单信息
                let newMenuList = JSON.parse(JSON.stringify(t.myMenuList)) || [],   // 我的收藏列表信息
                    msg = '';                                                       // 提示信息

                /* 如果是已经收藏的菜单，从我的收藏中取消 */
                if (t.isCollected(menu)) {
                    // 将当前要取消的菜单从 我的收藏 列表中移除，并生成新的数组
                    newMenuList = newMenuList.filter(e => menu.id !== e.id);
                    msg = "取消收藏成功";
                } else {
                    // 将当前选中的菜单信息 添加到我的收藏
                    newMenuList.push(menu);
                    msg = "收藏成功";
                }

                /* 如果新的数组长度大于系统限制的个数 */
                if (newMenuList.length > MY_COLLECTION_LIMIT) {
					
                    let tip3 = "最多收藏";
                    let tableItem = "条";

                    t.$message['warning'](tip3 + ' ' + MY_COLLECTION_LIMIT + ' ' + tableItem);
                    return;
                }

                /* 调用 api 接口更新 我的收藏 列表 */
                t.$store.dispatch('saveServiceMenu', newMenuList).then(() => {
                    t.$message['success'](msg);
                });
            },

            /* 点击菜单项跳转路由 */
            goService(service) {
                this.$refs.serviceMenu.close('1');
                this.$router.push(service.url);
            },

            /**
             * 深度搜索
             *
             * arrTree => 要进行循环查找的数组树
             *            其中，数组中每个对象里面需要包含：
             *              name<String> -> 节点名称，拿该节点来匹配是否包含要查找的关键字
             *              children<Array> -> 子节点数组
             *
             * searchStr => 要查找的关键字
             * */
            deepSearch(arrTree, searchStr) {
                let t = this;
                let newTree = [];                   // 最终要返回的数组

                let tem = arrTree[0];               // 以数组第 0 个为模板进行判断（PS：其实也可以在 for 循环的时候再进行判断）
                let _children = tem.children;       // 找到模板对象的子节点
                let isParent = (tem.parentId === '-1');                                     // 是否根节点
                let isFilter = !isParent && _children && !('children' in _children[0]);     // 是否满足过滤条件

                for(let i = arrTree.length - 1; i >= 0; i--) {                              // 从数组最后一个开始循环
                    let item = arrTree[i];
                    let arr = item.children,
                        c_arr = [];                 // 定义一个空数组，后面会将当前节点下包含关键字的子节点暂存在这里

                    let isContain = (item.name.toLocaleLowerCase().indexOf(searchStr) >= 0);                    // 当前节点是否包含要查找的关键字
                    newTree.unshift(JSON.parse(JSON.stringify(item)));                      // unshift 到数组第 0 个

                    if (isParent || !isFilter) {
                        c_arr = t.deepSearch(newTree[0].children, searchStr);               // 通过递归，去找下一级节点
                    } else {
                        c_arr = arr.filter(e => e.name.toLocaleLowerCase().indexOf(searchStr) >= 0);            // 过滤叶子节点是否包含关键字
                    }

                    if (c_arr.length > 0) {
                        newTree[0].children = c_arr;                                        // 当前第 0 个的子数组等于过滤后的新数组
                    } else {
                        if (!isContain) {
                            // 子节点没有匹配关键字，并且当前节点也不包含关键字
                            newTree.splice(0, 1);
                        } else {
                            // 子节点没有匹配关键字，当前节点包含关键字
                            newTree[0].children = JSON.parse(JSON.stringify(arr));
                        }
                    }
                }

                return newTree;
            },

            /* 返回服务目录菜单的搜索结果 */
            getSearchMenu() {
                let t = this;
                let menuList = t.serviceMenus;
                let searchStr = t.searchCondition.replace(/\s+/g, '');      // 要搜索的关键字 去除所有空格

                /* 如果搜索关键字为空 直接返回 menuList */
                if (!searchStr) { return menuList; }

                return t.deepSearch(menuList, searchStr.toLocaleLowerCase());
            },

            /*服务目录菜单搜索功能*/
            searchServiceMenu() {
                this.viewMenus = this.getSearchMenu();
            },

            /* 查询服务菜单 */
            initMenuList() {
                let t = this;

                if (!t.serviceMenus || t.serviceMenus.length === 0) {
                    setTimeout(() => { t.initMenuList(); }, 500);
                    return;
                }

                t.viewMenus = deepClone(t.serviceMenus);        // 给要显示的菜单目录赋值
            },

            // 返回当前的菜单项是否有收藏
            isCollected(menu) {
                return this.myMenuList.find(item => { return item.id === menu.id; });
            }
        },

        mounted() {},
        watch: {},
    }
</script>



<style lang="scss" scoped>
    @import '@/assets/css/variables.scss';
    .service-menu.el-menu--horizontal.el-menu{
        background: none;border: 0 ;
        /deep/ .el-submenu{
            .el-submenu__title{
                height: 50px;
                line-height: 50px;
                color: #ccc;
                i{
                    color: #ccc;
                }
                .el-submenu__icon-arrow{
                    margin-left: 5px;
                    font-size: 12px;
                    margin-top: 1px;
                    &:before{
                        content:"\e790";
                    }
                }
                .tit{
                    vertical-align: middle;
                    margin-left: 5px;
                }
            }
        }
        /deep/.el-submenu:hover{
            .el-submenu__title{
                background:rgb(50, 50, 50);
                color: #fff;
                >i{
                    color:#fff;
                }
            }
        }
        /deep/.el-submenu:focus{
            .el-submenu__title{
                color:#909399;
            }
        }
        .el-submenu.is-opened{
            /deep/.el-submenu__title{
                background:rgb(50, 50, 50);
                color: #fff;
                >i{
                    color:#fff;
                }
            }
        }
    }
</style>

<style lang="scss">

    /* 菜单瀑布流布局 秦俊强20200809 新增 */
    .waterfall-container {
        /* 分几列 */
        column-count: 3;

        /* 列间距，可有可无，默认30px */
        column-gap: 60px;

        /* 描边线 */
        /*column-rule: 1px solid #000;*/
    }
    .waterfall-item {
        /* 不留白 */
        break-inside: avoid;
        color: #cccccc;

        .main-title {
            font-weight: bold;

            i { width: 20px; }
        }

        .menu-item {
            padding: 2px 10px 2px 20px;
            position: relative;

            [class*="el-icon-star-"] {
                position: absolute;
                right: 20px;
                top: 8px;
            }

            .el-icon-star-on { color: rgb(255, 102, 0); }
            .el-icon-star-off { display: none; }

            &:hover {
                color: #fafafa;
                background-color: #434343;
                cursor: pointer;

                .el-icon-star-off { display: inline-block; }
            }
        }
    }



    .service-submenu {
        /*display:block!important;*/
        left: 0!important;top: 50px!important;
        bottom: 0;
        .el-menu.el-menu--popup.el-menu--popup-bottom-start {
            height: 100%;
            padding: 0 0 20px 0;margin-top: 0;
            border:none;
            background:rgb(50, 50, 50);
            .menu-container{
                position: relative;

                /* 旧版布局宽度 */
                /*width: 880px;*/

                /* 新版瀑布流布局宽度 */
                width: 820px;

                height: 100%;
                background:rgb(50, 50, 50);
                padding: 0 20px;
                .menu-search-box{
                    padding-top: 10px;
                    .el-input__inner{
                        border-width: 0 0 1px 0;
                        border-radius: 0;
                        background:rgb(50, 50, 50);
                        border-bottom-color: rgb(128, 128, 128);
                        font-size: 14px;
                        &:focus{
                            border-color:#ffffff;
                            color:#ffffff;
                            opacity: .8;
                        }
                    }
                }
                .menu-item-box{
                    position: absolute;
                    left: 20px;
                    right: 20px;
                    top: 65px;
                    bottom:0;

                    .menu-line{
                        position: absolute;
                        left: 48%;top:12px;
                        height: 100%;
                        border-right:1px solid rgb(128, 128, 128);
                    }
                    .scrollbar-wrapper{
                        overflow-y:auto; height:100%;
                        padding: 10px 5px 5px 5px;
                        .no-content{
                            color:#ffffff;
                            opacity: .8;
                        }
                        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
                        &::-webkit-scrollbar
                        {
                            width: 8px;
                        }
                        /*定义滚动条轨道 内阴影+圆角*/
                        &::-webkit-scrollbar-track-piece
                        {
                            -webkit-box-shadow: none;
                            border-radius: 0;
                            background-color: rgb(50, 50, 50);
                        }
                        /*定义滑块 内阴影+圆角*/
                        &::-webkit-scrollbar-thumb {
                            margin-top: 10px;
                            border-radius: 10px;
                            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
                            background-color: rgba(0,0,0,.7);
                        }

                    }
                    .ceil{
                        width: 50%;
                        &:nth-child(even){
                            padding-left: 20px;
                        }
                        vertical-align: top;
                        display: inline-block;
                        .label{
                            color: rgb(242, 242, 242);
                            font-size: 16px;font-weight: 700;
                            >i{
                                color: rgb(242, 242, 242);
                                padding-right: 8px;
                            }
                        }
                        .main{
                            padding:5px 0 50px 15px;
                            line-height: 30px;
                            .items-box{
                                /*min-width: 33%;俊强说撤掉*/
                                float: left;
                                display: inline-block;
                                .item{
                                    display: inline-block;padding: 0 10px;margin: 4px 15px 0 0;
                                    color: rgb(204, 204, 204);font-size: 14px;
                                    white-space: nowrap;
                                    .coll-btn-group{text-align: right; margin: 0}
                                    > i {
                                        visibility: hidden;
                                        font-size: 14px;margin-left: 10px;
                                    }
                                    &:hover{
                                        cursor: pointer;
                                        background-color: rgb(67, 67, 67);
                                        > i {
                                            visibility: visible;
                                        }
                                    }
                                    &.collected{
                                        >i{
                                            visibility: visible;
                                            color: rgb(255, 102, 0);
                                        }
                                    }
                                    &.active{
                                        background-color: rgb(67, 67, 67);
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }
    }
</style>
