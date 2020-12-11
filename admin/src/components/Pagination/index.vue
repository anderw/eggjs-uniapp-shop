<!--
 - @description     通用分页器组件
 -
 - @author          涂重阳
 - @email           779311998@qq.com
 - @phone           18707133663
-->
<template>
    <div :class="{'hidden':hidden}" class="pagination-container">
        <el-pagination :background="background" :disabled='disabled' :small='small' :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout" :page-sizes="pageSizes1" :total="total" v-bind="$attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
</template>
<script>
import { scrollTo } from '@/utils/scrollTo';

export default {
    name: 'Pagination',
    props: {
        total: {
            required: true,
            type: Number
        },
		small:{
			type: Boolean,
			default: false
		},
        pageIndex: {
            type: Number,
            default: 1
        },
        limit: {
            type: Number,
            default: 10
        },
        pageSizes: {
            type: Array,
            default () {
                return [10, 20, 30, 50, 100]
            }
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        background: {
            type: Boolean,
            default: true
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        hidden: {
            type: Boolean,
            default: false
        },
		disabled:{
			type: Boolean,
			default: false
		}
    },
    computed: {
        currentPage: {
            get() {
                return this.pageIndex
            },
            set(val) {
                this.$emit('update:pageIndex', val)
            }
        },
        pageSize: {
            get() {
                return this.limit
            },
            set(val) {
                this.$emit('update:limit', val)
            }
        }
    },
    data(){
        return {
            pageSizes1:[]
        }
    },
    created(){
        this.pageSizes1 = this.pageSizes.map((item,i)=>this.limit*item/10);
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('pagination', { page: this.currentPage, pageSize: val })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        },
        handleCurrentChange(val) {
            this.$emit('pagination', { page: val, pageSize: this.pageSize })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.pagination-container {
    background: #fff;
    padding: 20px 0;
    text-align: right;
    /deep/{
        .el-pagination button, .el-pagination span:not([class*=suffix]){
            font-size: 12px;
        }
        .el-pagination__total{
            color: $gray-1;
        }
        .el-pagination__jump{
            color: $gray-1;
        }
        .el-pager li{
            font-weight: normal;
        }
        .el-pager li:not(.disabled).active{
            background: $red-select;
        }
    }
}

.pagination-container.hidden {
    display: none;
}
</style>