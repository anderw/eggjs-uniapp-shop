<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button>
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">权限管理</div>
        </el-header>
        <el-main class="center-main">
            <div class="table-filter">
                <el-button type="primary" @click="edit()" icon="el-icon-plus" class="float-right">添加</el-button>
            </div>
            <TableMain ref="table" :columnItems="columnItems" :api="listApi">
                <template slot="status" slot-scope="scope">
                    <span v-if="scope.row.status==1">可用</span>
                    <span v-else>不可用</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
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
            listApi:systemApi.permission.list,
            columnItems:[
                {prop:'name',label:'名称'},
                {prop:'id',label:'权限ID'},
                {prop:'actions',label:'操作'},
                {prop:'createdAt',label:'创建时间'},
                {prop:'action',label:'操作'},
            ],
            currentData: null,
            menuVisible: false,
            authVisible:false
        }
    },
    created() {
        
    },
    methods: {
        edit(data) {
            var schema = [
                {label:'权限ID',prop: "id"},
                {label:'权限名称',prop: "name"},
                {label:'操作',prop: "actions"},
            ]
            FormDialog.show({
                title: data ? '编辑权限' : '添加权限',
                schema: schema,
                rules:{
                    id:[
                        {required: true, message: '请输入权限ID',trigger: 'blur'}
                    ],
                    name:[
                        {required: true, message: '请输入权限名称',trigger: 'blur'}
                    ],
                    actions:[
                        {required: true, message: '请输入操作',trigger: 'blur'}
                    ]
                },
                api:{save: systemApi.permission.save,update: systemApi.permission.save},
                form: data,
                submit: this.submit
            })
        },
        submit(data) {
            this.refresh();
        },
        refresh() {
            this.$refs.table.refresh();
        },
        remove(data){
        	this.$confirm('确认删除权限【'+data.name+'】吗','提示').then(res=>{
        		systemApi.permission.remove(data.id).then(res=>{
        			this.$message({type:'success',message:'删除成功',duration: 2000});
        			this.refresh();
        		})
        	}).catch(()=>{})
        },
        authMenu(data){
            this.currentData = data;
            this.menuVisible=true
        },
        authPermission(data){
            this.currentData = data;
            this.authVisible=true
        }
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