<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button>
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">管理菜单</div>
        </el-header>
        <el-main class="center-main">
        <div class="table-filter">
            <el-button type="primary" @click="edit()" icon="el-icon-plus" class="float-right">添加</el-button>
        </div>
        <div class="menu-conatiner">
        <el-tree ref="tree" class="menu-tree" :props="props" :data="tree" highlight-current default-expand-all>
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <i class="node-icon" :class="[data.icon||'el-icon-folder']"></i>
                <span class="node-tit">{{ data.name }}</span>
                <el-dropdown class="control" trigger="click">
                    <el-button class="el-dropdown-link" icon="el-icon-more" @click.stop type="text"></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><div @click="()=>{edit(data,node)}"><i class="el-icon-edit"></i> 编辑</div></el-dropdown-item>
                        <el-dropdown-item><div @click="()=>{addChild(data)}"><i class="el-icon-plus"></i> 添加子菜单</div></el-dropdown-item>
                        <el-dropdown-item><div @click="()=>{remove(data)}" class="color-red"><i class="el-icon-delete"></i> 删除</div></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-tree>
        </div>
        </el-main>
    </el-container>
</template>
<script>
import systemApi from '@/views/system/api';
import Pagination from '@/components/Pagination';
import FormDialog from '@/components/FormDialog';
import { deepClone } from '@/utils'
export default {
    components: { Pagination },
    data() {
        return {
            listQuery: {

            },
            props: {
                label: 'name',
                children: 'children',
                isLeaf: 'leaf'
            },
            tree: []
        }
    },
    created() {
        this.loadNode();
    },
    methods: {
        loadNode() {
            systemApi.menu.tree().then(res => {
                this.tree = res.result
            })

        },
        edit(data,node) {
            var schema = [
                {label:'菜单名称',prop: "name"},
                {label:'图标',prop: "icon"},
                {label:'路径',prop: "url"}
            ]
            if(data){
                data.parent = node.parent.data.name||'无'
                schema.unshift({label:'父级菜单',prop: "parent",readonly:true})
            }else{
                schema.unshift({label:'父级菜单',prop: "parentId",formtype:'select',remote:true,remoteMethod:systemApi.menu.select,valueKey:'id',labelKey:'name'})
            }
            FormDialog.show({
                title: data ? '编辑菜单' : '添加菜单',
                schema: schema,
                rules:{
                    name:[
                        {required: true, message: '请输入菜单名称',trigger: 'blur'}
                    ]
                },
                api:{save: systemApi.menu.save,update: systemApi.menu.save},
                form: data,
                submit: this.submit
            })
        },
        submit(data) {
            this.refresh();
        },
        refresh() {
            this.loadNode();
        },
        addChild(data) {
            var form={
                parent:data.name,
                parentId:data.id,
            }
        	var schema = [
                {label:'父级菜单',prop: "parent",readonly:true},
                {label:'父级菜单',prop: "parentId",hidden:true},
                {label:'菜单名称',prop: "name"},
                {label:'图标',prop: "icon"},
                {label:'路径',prop: "url"}
            ]
            FormDialog.show({
                title:'添加菜单',
                schema: schema,
                rules:{
                    name:[
                        {required: true, message: '请输入菜单名称',trigger: 'blur'}
                    ]
                },
                api:{save: systemApi.menu.save,update: systemApi.menu.save},
                form: form,
                submit: this.submit
            })
        },
        remove(data){
        	this.$confirm('确认删除菜单【'+data.name+'】吗','提示').then(res=>{
        		systemApi.menu.remove(data.id).then(res=>{
        			this.$message({type:'success',message:'删除成功',duration: 2000});
        			this.loadNode();
        		})
        	}).catch(()=>{})
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