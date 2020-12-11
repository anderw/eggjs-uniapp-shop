<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button>
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">商品分类</div>
        </el-header>
        <el-main class="center-main">
            <div class="table-filter">
                <el-button type="primary" @click="edit()" icon="el-icon-plus" class="float-right">添加</el-button>
            </div>
            <TableMain ref="table" :columnItems="columnItems" :api="listApi" @row-click="onRowClick">
                <template slot="icon" slot-scope="scope">
                    <img  v-if="scope.row.image" :src="baseUrl+scope.row.image.url" height="60px">
                </template>
                <template slot="status" slot-scope="scope">
                    <span v-if="scope.row.status==1" class="color-green">可用</span>
                    <span v-else class="color-gray">禁用</span>
                </template>
                <template slot="parent" slot-scope="scope">
                    <span v-if="scope.row.parent">{{scope.row.parent.name}}</span>
                    <span v-else>--</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click.stop="edit(scope.row)">编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="color-red" @click.stop="remove(scope.row)">删除</el-button>
                </template>
            </TableMain>
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
            listQuery: {

            },
            listApi:goodApi.category.list,
            columnItems:[
                {prop:'id',label:'ID'},
                {prop:'name',label:'名称'},
                {prop:'description',label:'描述'},
                {prop:'icon',label:'图片'},
                {prop:'parent',label:'上级分类'},
                {prop:'status',label:'状态'},
                {prop:'createdAt',label:'创建时间'},
                {prop:'action',label:'操作',width: 180},
            ],
            currentData: null,
            dVisible: false,
        }
    },
    computed:{
        ...mapGetters(['baseUrl'])
    },
    created() {
        
    },
    methods: {
        edit(data) {
            var schema = [
                {label:'名称',prop: "name"},
                {label:'描述',prop: "description"},
                {label:'上级分类',prop: "parentId",formtype:'select',remote:true,remoteMethod:goodApi.category.select,valueKey:'id',labelKey:'name'},
                // {label:'图片',prop: "imageId",formtype: 'file'},
                {label:'状态',prop: "status",formtype:'radio',options:[{label:'启用',value:1},{label:'禁用',value:2}],default: 1},
            ]
            FormDialog.show({
                title: data ? '编辑商家' : '添加商家',
                schema: schema,
                rules:{
                    name:[
                        {required: true, message: '请输入名称',trigger: 'blur'}
                    ],
                },
                api:{save: goodApi.category.save,update: goodApi.category.save},
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
        onRowClick(row){
            this.currentData = row;
            this.dVisible = true;
        },
        remove(data){
        	this.$confirm('确认删除分类【'+data.name+'】吗','提示').then(res=>{
        		goodApi.category.remove(data.id).then(res=>{
        			this.$message({type:'success',message:'删除成功',duration: 2000});
        			this.refresh();
        		})
        	}).catch(()=>{})
        },
    }
}
</script>
<style lang="scss" scoped>

</style>