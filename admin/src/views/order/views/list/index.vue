<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button>
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">订单管理</div>
        </el-header>
        <el-main class="center-main">
            <div class="table-filter">
                
            </div>
            <TableMain ref="table" :columnItems="columnItems" :api="listApi" @row-click="onRowClick">
                <template slot="action" slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click.stop="edit(scope.row)">编辑</el-button>
                    <!-- <el-button type="text" icon="el-icon-delete" class="color-red" @click.stop="remove(scope.row)">删除</el-button> -->
                </template>
            </TableMain>
        </el-main>
        <Detail :visible.sync="dVisible" :data="currentData"></Detail>
    </el-container>
</template>
<script>
import orderApi from '@/views/order/api';
import FormDialog from '@/components/FormDialog';
import { deepClone } from '@/utils'
import {mapGetters} from 'vuex'
import {castFilter,constant} from '@/filters'
import Detail from './detail';
export default {
    components: {Detail },
    data() {
        return {
            listQuery: {
                page: 1,
                pageIndex: 10
            },
            listApi:orderApi.order.list,
            columnItems:[
                {prop:'id',label:'ID'},
                {prop:'orderNo',label:'订单编号'},
                {prop:'userName',label:'用户'},
                {prop:'totalAmount',label:'订单金额',filter: castFilter},
                {prop:'status',label:'状态',filter: constant,filterParams:['OrderStatus']},
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
            const query = {};
            if(data){
                query.id=data.id
            }
        },
        submit(data) {
            this.refresh();
        },
        refresh() {
            this.$refs.table.refresh();
        },
        remove(data){
        	this.$confirm('确认删除商户【'+data.name+'】吗','提示').then(res=>{
        		goodApi.good.remove(data.id).then(res=>{
        			this.$message({type:'success',message:'删除成功',duration: 2000});
        			this.refresh();
        		})
        	}).catch(()=>{})
        },
        onRowClick(row){
            this.currentData = row;
            this.dVisible = true;
        },
    }
}
</script>
<style lang="scss" scoped>

</style>