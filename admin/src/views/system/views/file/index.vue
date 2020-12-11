<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button>
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">文件管理</div>
        </el-header>
        <el-main class="center-main">
            <TableMain ref="table" :columnItems="columnItems" :api="listApi">
                <template slot="url" slot-scope="scope">
                    <img :src="$store.getters.baseUrl + scope.row.url" height="60px">
                </template>
                <template slot="size" slot-scope="scope">
                    <span>{{getSize(scope.row.size)}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="text" icon="el-icon-delete" class="color-red" @click="remove(scope.row)">删除</el-button>
                </template>
            </TableMain>
        </el-main>
    </el-container>
</template>
<script>
import systemApi from '@/views/system/api';
import FormDialog from '@/components/FormDialog';
import { deepClone } from '@/utils'

export default {
    components: { },
    data() {
        return {
            listQuery: {

            },
            listApi:systemApi.file.list,
            columnItems:[
                {prop:'id',label:'ID'},
                {prop:'name',label:'名称'},
                {prop:'type',label:'类型'},
                {prop:'format',label:'邮箱'},
                {prop:'url',label:'地址'},
                {prop:'size',label:'大小'},
                {prop:'creator',label:'创建人'},
                {prop:'createdAt',label:'创建时间'},
                {prop:'action',label:'操作',width: 120},
            ],
            currentData: null,
            menuVisible: false,
            authVisible:false
        }
    },
    created() {
        
    },
    methods: {
        refresh() {
            this.$refs.table.refresh();
        },
        getSize(val){
            var map=[
                {value: 1024,unit:'B'},
                {value: 1024*1024,unit:'KB'},
                {value: 1024*1024*1024,unit:'MB'},
                {value: 1024*1024*1024*1024,unit:'GB'},
                {value: 1024*1024*1024*1024*1024,unit:'TB'},
            ]
            for(let i=1;i<map.length;i++){
                if(val < map[i].value){
                    return parseFloat(1024*val/map[i].value).toFixed(2) + map[i].unit;
                }
            }
        },
        remove(data){
        	this.$confirm('确认删除文件【'+data.name+'】吗？删除数据同时也会将文件从服务器删除！','提示').then(res=>{
        		systemApi.file.remove(data.id).then(res=>{
        			this.$message({type:'success',message:'删除成功',duration: 2000});
        			this.refresh();
        		})
        	}).catch(()=>{})
        },
    }
}
</script>
<style lang="scss" scoped>
.menu-conatiner{
	margin: 10px auto;
    width: 600px;
}
.menu-tree {
    margin: 10px 10px;

    /deep/ {
        .el-tree-node__content {
            height: 30px;
        }

        .custom-tree-node {
        	width: 100%;
            .node-icon {
                margin-right: 5px;
            }
            .control{
            	float: right;
            	.el-dropdown-link{
            		padding: 0 10px;
            		color: #666;
            	}
            }
        }
    }
}
</style>