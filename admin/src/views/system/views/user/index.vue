<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button>
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">用户管理</div>
        </el-header>
        <el-main class="center-main">
            <div class="table-filter">
                <el-button type="primary" @click="edit()" icon="el-icon-plus" class="float-right">添加</el-button>
            </div>
            <TableMain ref="table" :columnItems="columnItems" :api="listApi">
                <template slot="sex" slot-scope="scope">
                    <span v-if="scope.row.status==1">男</span>
                    <span v-else>女</span>
                </template>
                <template slot="status" slot-scope="scope">
                    <span v-if="scope.row.status==1" class="color-green">可用</span>
                    <span v-else class="color-gray">不可用</span>
                </template>
                <template slot="role" slot-scope="scope">
                    <el-tag>{{scope.row.role.name}}</el-tag>
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
            listApi:systemApi.user.list,
            columnItems:[
                {prop:'id',label:'ID'},
                {prop:'name',label:'名称'},
                {prop:'username',label:'用户名'},
                {prop:'email',label:'邮箱'},
                {prop:'phone',label:'电话'},
                {prop:'sex',label:'性别'},
                {prop:'role',label:'角色'},
                {prop:'status',label:'状态'},
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
        edit(data) {
            var schema = [
                {label:'名称',prop: "name"},
                {label:'用户名',prop: "username"},
                {label:'邮箱',prop: "email"},
                {label:'电话',prop: "phone"},
                {label:'性别',prop: "sex",formtype:'radio',options:[{label:'男',value:1},{label:'女',value:2}],default: 1},
                {label:'角色',prop: "roleId",formtype:'select',remote:true,remoteMethod: systemApi.role.select,labelKey:'name',valueKey:'id'},
            ]
            if(!data){
                schema.push({label:'密码',prop:'password'})
            }
            FormDialog.show({
                title: data ? '编辑用户' : '添加用户',
                schema: schema,
                rules:{
                    username:[
                        {required: true, message: '请输入用户名',trigger: 'blur'}
                    ],
                    name:[
                        {required: true, message: '请输入名称',trigger: 'blur'}
                    ],
                    roleId:[
                        {required: true, message: '请选择角色',trigger: 'blur'}
                    ],
                },
                api:{save: systemApi.user.save,update: systemApi.user.update},
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
        	this.$confirm('确认删除用户【'+data.name+'】吗','提示').then(res=>{
        		systemApi.user.remove(data.id).then(res=>{
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