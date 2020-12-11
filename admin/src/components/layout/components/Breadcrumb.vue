<template>
    <div class="breadcrumb-container">
        <span class="txt"><i class="el-icon-location-outline"></i>位置：</span>
        <el-breadcrumb class="app-breadcrumb" separator=" ">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                    <span class="before"></span>
                    <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{generateTitle(item.meta.title) }}</span>
                    <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>
<script>
import { generateTitle } from '@/utils/i18n'
import pathToRegexp from 'path-to-regexp'

export default {
    data() {
        return {
            levelList: null
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        generateTitle,
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name)
            const first = matched[0]
            if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
                matched = [{ path: '/dashboard', meta: { title: 'dashboard' } }].concat(matched)
            }

            this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
        },
        pathCompile(path) {
            // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
            const { params } = this.$route
            var toPath = pathToRegexp.compile(path)
            return toPath(params)
        },
        handleLink(item) {
            const { redirect, path } = item
            if (redirect) {
                this.$router.push(redirect)
                return
            }
            this.$router.push(this.pathCompile(path))
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-breadcrumb.el-breadcrumb {
    float: left;
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
    .first-text{
        .el-breadcrumb__separator{
            display: none;
        }
    }
}
.breadcrumb-container{
    padding: 10px 20px;
    background: #fff;
    line-height: 30px;
    .txt{
        float: left;
        color:#888;
        font-size: 14px;
    }
    .el-breadcrumb__inner{
        background: #f2f2f2;
        line-height: 32px;
        display: inline-block;
        vertical-align: middle;
        padding: 0 10px;
        cursor: pointer;
        a{
            display: block;
        }
    }
    .el-breadcrumb__separator{
        line-height: 32px;
        display: inline-block;
        width: 0;
        height: 0;
        display: inline-block;
        margin:0 10px 0 0;
        vertical-align: middle;
        border-top: 16px solid transparent;
        border-bottom: 16px solid transparent;
        border-left: 16px solid #f2f2f2;
    }
    .el-breadcrumb__item{
        // position: relative;
        padding-left: 14px;
        margin-right: -20px;
        .el-breadcrumb__inner{
            position: relative;
        }
        .before{
            position: absolute;
            left: -16px;
            top: 0;
            bottom: 0;
            &:before,&:after{
                content: "";
                display: block;
                width: 0;
                height: 0;
                border-top: 8px solid #f2f2f2;
                border-right: 8px solid #f2f2f2;
                border-bottom: 8px solid transparent;
                border-left: 8px solid transparent;
                position: absolute;
                left: 0;
                top: 0;
            }
            &:after{
                top: 50%;
                border-top: 8px solid transparent;
                border-bottom: 8px solid #f2f2f2;
            }
        }
        &:last-child .el-breadcrumb__separator{
            display: inline-block;
        }
        &:hover{
            a{
                color:#303133;
            }
            .el-breadcrumb__inner{
                // background: #ddd;
            }
            .el-breadcrumb__separator{
                // border-left-color:#ddd;
            }
            .before:before{
                // border-top-color: #ddd;
                // border-right-color: #ddd;
            }
            .before:after{
                // border-right-color: #ddd;
                // border-bottom-color: #ddd;
            }
        }
    }
}
</style>