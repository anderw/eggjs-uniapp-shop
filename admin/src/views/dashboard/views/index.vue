<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button>
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">概览</div>
        </el-header>
        <el-main class="center-main">
            
        </el-main>
    </el-container>
</template>
<script>
import goodApi from '@/views/good/api';
import FormDialog from '@/components/FormDialog';
import { deepClone } from '@/utils'
import {mapGetters} from 'vuex'
export default {
    components: { },
    data() {
        return {
        }
    },
    computed:{
        ...mapGetters(['baseUrl'])
    },
    created() {
        
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>

</style>