<!--
 * @description     月结账单
 *
 * @author          陈威
 * @create          2019-10-22 11:00
-->

<template>
    <el-drawer title="账号详情" :visible.sync="currentVisible" :before-close="onClose" size='600px' :modal-append-to-body='false' :destroy-on-close='true' @open="init">
        <div class="drawer-body" v-loading="loading" >
            <BaseInfo title="基础信息" :list='list'></BaseInfo>
            <BaseInfo title="管理员信息" :list='userInfo'></BaseInfo>
        </div>
    </el-drawer>
</template>
<script>
import merchantApi from "@/views/merchant/api";
import BaseInfo from '@/components/BaseInfo';
import {constant} from '@/filters'
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
            detail:{}
        }
    },
    computed:{
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
            this.getDetail()
        },
        getList() {
            const map = [
                { val: 1, label: '正常', icon: '', className: 'color-green' },
                { val: 2, label: '禁用', icon: '', className: 'color-orange' },
            ]
            const current = map.find(item => item.val == this.data.status);
            let status
            if (current) {
                status = `<span class="${current.className}">${current.label}</span>`
            }
            
            this.list = [
                {title:'ID',value:this.data.id},
                {title:'名称',value:this.data.name},
                {title:'地址',value:this.data.address},
                {title:'appId',value: this.data.appId},
                {title:'appSecret',value: this.data.appSecret},
                {title:'mchId',value: this.data.mchId},
                {title:'mchKey',value: this.data.mchKey},
                {title:'状态',value:status},
            ]
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
            this.$api.system.user.detail(this.data.userId).then(res=>{
                this.userInfo = [
                    {title:'ID',value: res.result.id},
                    {title:'用户名',value: res.result.username},
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