<!--
 * @description     订单详情
 *
-->

<template>
    <el-drawer title="订单详情" :visible.sync="currentVisible" :before-close="onClose" size='600px' :modal-append-to-body='false' :destroy-on-close='true' @open="init">
        <div class="drawer-body" v-loading="loading" >
            <BaseInfo title="基础信息" :list='list'></BaseInfo>
            <BaseInfo title="收货信息" :list='addressInfo'></BaseInfo>
            <BaseInfo title="商品信息">
                <TableMain ref="table" :columnItems="columnItems">
                    <template slot="goodPic" slot-scope="scope">
                        <img  v-if="scope.row.goodPic" :src="baseUrl+scope.row.goodPic" height="60px">
                    </template>
                    <template slot="status" slot-scope="scope">
                        <span v-if="scope.row.status==1" class="color-green">上架</span>
                        <span v-else class="color-gray">下架</span>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click.stop="edit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="color-red" @click.stop="remove(scope.row)">删除</el-button>
                    </template>
                </TableMain>
            </BaseInfo>

            
        </div>
    </el-drawer>
</template>
<script>
import {mapGetters} from 'vuex';
import merchantApi from "@/views/merchant/api";
import BaseInfo from '@/components/BaseInfo';
import {constant,time} from '@/filters'
import {constantMap} from '@/utils/constant'
export default {
    components: {BaseInfo},
    props: {
        visible: {
            type:Boolean,
            default:false
        },
        data:{
            type:Object,
            default:()=>{return {}}
        },
    },
    data() {
        return {
            loading:false,
            list:[],
            userInfo:[],
            addressInfo:[],
            detail:{},
            columnItems:[
                // {prop:'id',label:'ID'},
                {prop:'goodName',label:'名称'},
                {prop:'goodPic',label:'主图'},
                {prop:'goodSpecName',label:'规格'},
                {prop:'salePrice',label:'单价'},
                {prop:'qty',label:'数量'},
                {prop:'amount',label:'总价'},
            ],
        }
    },
    computed:{
        ...mapGetters(['baseUrl']),
        currentVisible:{
            get(){
                return this.visible
            },
            set(val){
                this.$emit('update:visible', val)
            }
        }
    },
    methods: {
        init(){
            this.getList();
            // this.getDetail()
        },
        getList() {
            
            const current = constantMap.OrderStatus.find(item => item.value == this.data.status);
            let status
            if (current) {
                status = `<span class="${current.className}">${current.label}</span>`
            }
            
            this.list = [
                {title:'ID',value:this.data.id},
                {title:'订单编号',value:this.data.orderNo},
                {title:'用户',value:this.data.userName},
                {title:'订单金额',value: this.data.totalAmount},
                {title:'状态',value: status},
                {title:'下单时间',value: time(this.data.createdAt)},
            ]
            this.addressInfo = [
                {title:'收货地址',value:this.data.address},
                {title:'收货人',value:this.data.linkMan},
                {title:'收货人电话',value:this.data.linkPhone},
            ]
            setTimeout(()=>{
                this.$refs.table.list = this.data.goodList;
            })
        },
        getDetail(){
            const map = [
                { val: 1, label: '正常', icon: '', className: 'color-green' },
                { val: 2, label: '禁用', icon: '', className: 'color-orange' },
            ]
            const current = map.find(item => item.val == this.data.status);
            let status
            if (current) {
                status = `<span class="${current.className}">${current.label}</span>`
            }
            this.$api.order.order.detail(this.data.id).then(res=>{
                this.userInfo = [
                    {title:'ID',value: res.result.id},
                    {title:'订单编号',value: res.result.username},
                    {title:'姓名',value:res.result.name},
                    {title:'电话',value: res.result.address},
                    {title:'邮箱',value: res.result.email},
                    {title:'性别',value: constant(res.result.sex,'UserSex')},
                    {title:'状态',value: status},
                ]
            }).catch(err=>{console.log('err',err)})
            // merchantApi.merchant.detail(this.data.id).then(res=>{
            //     this.detail = res.result;
                
            // })
        },
        onClose() {
            this.$emit('update:visible', false);
            this.$emit('close');
            
        },
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/variables.scss";

</style>