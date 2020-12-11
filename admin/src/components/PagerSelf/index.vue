<!--
 - @description     自定义通用分页器组件
 -
 - @author          大侠
 - @create          2019-07-29 09:00
-->
<template>
    <div class="wrapper">
        <div class="total clearfix">{{$t('common.together')}}{{' '+total+' '}}{{$t('common.item')}}</div>
        <div class="el-pagination clearfix">
            <button type="button" :disabled="pageIndex == 1" class="btn-prev" @click="handleChange('prev')">
                <i class="el-icon el-icon-arrow-left"></i>
            </button>
            <div class="pager">
               {{pageIndex}}/{{pageCount}}
            </div>
            <button type="button" :disabled="pageIndex == pageCount" class="btn-next" @click="handleChange('next')">
                <i class="el-icon el-icon-arrow-right"></i>
            </button>
        </div>
    </div>
</template>
<script>
import { scrollTo } from '@/utils/scrollTo';

export default {
    name: 'Pagination',
    props: {
        total: Number,//总数

        pageIndex: {
            type:Number,
            default:1,
        },//当前页

        pageSize:  {//每页数量
            type:Number,
            default:10,
        },
    },
    computed: {
        pageCount(){
            if(this.total){
                return Math.ceil(this.total/this.pageSize);
            }
        }
    },
    methods: {
        handleChange(tag){

            if(tag === 'prev'){
                if(this.pageIndex > 1){
                    --this.pageIndex;
                }
            }

            if(tag === 'next'){
                if(this.pageIndex <= this.pageCount){
                    ++this.pageIndex;
                }
            }

            this.$emit('update:pageIndex', this.pageIndex);

            setTimeout(()=>{
                this.$emit('pagination');
            });
        }
    },

    created(){

    },

    //数据
    data(){
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.wrapper{
    width: 100%;
    .total{float: left}
    .el-pagination{
        float:right;
        .pager{
            display: inline-block
        }
    }
}

</style>