<!--
 * @description     公共表格搜索组件
 *
 * @author          涂重阳
 * @email           779311998@qq.com
 * @create          2019-09-10
 * @example  <table-filter :listQuery.sync="listQuery" @change="search"></table-filter>
 * @params   <Object>listQuery: 键值为searchList的searchType
-->
<template>
    <div class="table-filter" v-if="filterList.length || filterOuterList.length">
        <!--云平台-->
        <div class="table-filter-outer">
            <div v-for="(item,index) in filterOuterList" :key="index">
                <SearchItem :current="item" :listQuery="query" @change="onChange"></SearchItem>
            </div>
        </div>
        <div class="main" v-if="filterList.length">
            <div class="table-filter-item table-filter-select" v-if="showType=='mini'">
                <div class="label" :style="{width:labelWidth+(labelWidth.indexOf('px')<=-1?'px': '')}">
                    <el-select v-model="current" value-key="prop">
                        <el-option v-for="(item,index) in filterList" :label="item.label" :value="item" :key="index"></el-option>
                    </el-select>
                </div>
                <div class="det">
                    <el-form @submit.native.prevent="search">
                        <SearchItem :current="current" :listQuery="query" @change="onChange"></SearchItem>
                    </el-form>
                </div>
            </div>
            <div class="table-filter-item table-filter-high" v-if="showType=='high'">
                <el-form @submit.native.prevent="search" class="common-form" :inline="device!='mobile'">
                    <el-form-item v-for="(item,index) in filterList" :label="item.label" :label-width="item.labelWidth" :key="index">
                        <SearchItem :current="item" :listQuery="query" @change="onChange"></SearchItem>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" type="primary" class="btn-common table-filter-item table-filter-btn-search" @click="search">搜索</el-button>
                        <el-button type="text" @click="toggleShowType" v-if="filterList.length>1">{{showType=='high'?"精简模式":"高级模式"}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <template v-if="showType=='mini'">
            <el-button icon="el-icon-search" type="primary" class="btn-common table-filter-item table-filter-btn-search" @click="search">搜索</el-button>
            <el-button type="text" @click="toggleShowType" v-if="filterList.length>1">{{showType=='high'?"精简模式":"高级模式"}}</el-button>
            </template>
        </div>
        <!--筛选项-->
        <div class="filter-query-list" v-if="filterQuery.length && showType=='mini'">
            <div class="title"><i class="fa fa-hourglass-half"></i><span style="margin-right: 5px;">检索项：</span></div>
            <ul>
                <li v-for="(item,index) in filterQuery" :key='index'>{{item.label}}：{{getLabelName(item)}}<span class="remove"  v-if="!item.deletion" @click="remove(item,index)" ><i class="el-icon-close"></i></span></li>
                <li class="clear" @click="clear">清空</li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {deepClone} from '@/utils';
import { constantMap } from '@/utils/constant';
import { time } from '@/filters';
import SearchItem from './SearchItem'
export default {
    name:'TableFilter',
    components: {SearchItem},
    props: {
        listQuery: {
            type: Object,
            default: () => {
                return {}
            }
        },
        filterSchema:{
            type: Array,
            default:()=>{
                return []
            }
        },
        labelWidth: {
            type: String,
            default: '150'
        },
        /**是否在选完后自动查询 */
        auto: {
            type: Boolean,
            default: true
        },
    },
    computed: {
        ...mapGetters(['device'])
    },
    data() {
        return {
            current: {},
            /* 用于组件内部的listQuery */
            query:{},
            /*检索项*/
            filterQuery: [],
            filterList:[],
            filterOuterList:[],
            /*daterangeModel*/
            showType: localStorage.getItem('tableFilterType') || 'high'
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.filterSchema.map(a=>{
                if(a.all){
                    this.$set(this.query,a.prop,'');
                }
                if(typeof(a.default)!='undefined'){
                    this.$set(this.query,a.prop,a.default);
                }
            })
            this.filterList = this.filterSchema.filter(a=>!a.outer);
            this.filterOuterList = this.filterSchema.filter(a=>a.outer)
            // console.log(this.query,'queyrs')
            if (this.filterList.length) {
                this.current = this.filterList[0];
                this.packQuery()
            }
        },

        packQuery(){
            var filterItem = this.filterQuery.find(item => item.prop == this.current.prop);
            var value = this.query[this.current.prop]
        
            /*当输入值为空时*/
            if (value === '' || value===null ||value===undefined|| (value instanceof Array && !value.length)) {
                for (var i = 0; i < this.filterQuery.length; i++) {
                    if (this.filterQuery[i].prop === this.current.prop) {
                        this.filterQuery.splice(i, 1); break;
                    }
                }
            } else {
                if (typeof filterItem !== 'undefined') {
                    this.$set(filterItem, 'searchValue', value);
                }else{
                    var searchItem = deepClone(this.current);
                    this.$set(searchItem, 'searchValue', value)
                    this.filterQuery.push(searchItem);
                }
            }
        },
        search() {
            this.packQuery()
            this.change();
        },
        /*获取检索项的key值*/
        getLabelName(data) {
            var current = this.filterList.find(item => item.prop == data.prop);
            if (current && current.selectList && current.selectList.length) {
                var curValues = (data.searchValue + '').split(',');
                var result = [];
                if (curValues.length) {
                    for (var i = 0; i < curValues.length; i++) {
                        var curItem = current.selectList.find(item => (item[current.valueKey] ||item.value + '') == curValues[i]);
                        if (curItem) {
                            result.push(curItem[current.labelKey]||curItem.label || curItem.displayName ||(current.getLabel&&current.getLabel(curItem))|| data.searchValue)
                        }
                    }
                    return result.join('，')
                } else {
                    return data.searchValue
                }

            }
            if (data.searchValue instanceof Array) {
                return data.searchValue.join(' - ')
            }
			if(['cloudCreateTime','createTime','openTime'].indexOf(data.prop)>-1){	
				return time(data.searchValue,data.format)
			}
            return data.searchValue

        },
        remove(item, index) {
            this.query[item.searchType] = ''
            this.filterQuery.splice(index, 1);
            this.onChange();
        },
        clear() {
            for (var i=0;i<this.filterList.length;i++) {
				if(!this.filterList[i].deletion){
					// deletion 控制必传的账期不可清空
                    this.query[this.filterList[i]['searchType']] = ''
				}
            }
			var list = this.filterQuery.filter(item=>{return item.deletion })
			this.filterQuery = list
            this.onChange();
        },
        
        change() {
            for(let i in this.query){
                this.$set(this.listQuery, i, this.query[i])
            }
            this.$emit('update:listQuery', this.listQuery);
            this.$emit('change');
        },
        onChange() {
            this.auto && this.search();
        },
        toggleShowType(){
            this.showType=this.showType=='high'?'mini':'high'
            window.localStorage.setItem('tableFilterType',this.showType)
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/css/variables.scss";
.table-filter {
    .main{
        &:after{
            content: "";
            clear: both;
            display: block;
        }
    }
    .table-filter-select {
        display: inline-block;
        border: 1px solid $gray-3;
        border-radius: 3px;
        vertical-align: top;
        line-height: 30px;
        height: 30px;
        .label {
            display: inline-block;
            .el-select {
            }
        }
        .det {
            display: inline-block;
            vertical-align: top;
            .el-input__inner {
                width: 300px;
            }
            .el-dropdown {
                .link{
                    width: 300px !important;
                    }
            }
        
        }
        .el-input__inner {
            height: 28px;
            line-height: 28px;
            border: 0;
            vertical-align: top;
            padding-top: 0;
            padding-bottom: 0;
            // width: 300px;
        }
    }
    .filter-radio-group{

        .el-radio-button{
            margin-right: 10px;
            
        }
        .el-radio-button__inner{
            border-radius: 30px;
            padding: 7px 20px;
        }
	}

    .table-filter-item.table-filter-high{
        float: left;
        margin-bottom: 0;
        .el-input,.el-select{
            width: 200px!important;
        }
        .el-form-item{
            margin-bottom: 8px;
        }
        .el-form-item__label{
            min-width: 100px;
            background: #fafafa;
            border: 1px solid #e7e7e7;
            height: 32px;
            line-height: 32px;
            border-right:0;
            border-radius: 3px 0 0 3px;
        }
        .el-input__inner{
            border-radius: 0 3px 3px 0;
        }
        .el-button{
            margin-bottom: 0;
        }
        .el-dropdown{
            .link{
                height: 32px;
                border: 1px solid #e7e7e7;
            }
        }
    
    }
    .table-filter-item {
        margin-bottom: 10px;
        + .table-filter-item {
            margin-left: 10px;
        }
    }
    .el-button.table-filter-btn-search {
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        border-radius: 3px;
        border: 0;
        vertical-align: top;
    }
    .filter-query-list {
        border: 1px solid $gray-3;
        padding-top: 10px;
        padding-left: 100px;
        margin-bottom: 10px;
        position: relative;
        .title {
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 12px;
            i {
                margin-right: 5px;
            }
        }
        ul {
            li {
                display: inline-block;
                margin: 0 10px 10px 0;
                border-radius: 2px;
                background: $gray-5;
                border: 1px solid $gray-3;
                // height: 20px;
                line-height: 19px;
                font-size: 12px;
                padding: 0 5px 0 10px;
                vertical-align: top;
                .remove {
                    margin-left: 10px;
                    cursor: pointer;
                    &:hover {
                        color: $red-select;
                    }
                }
                &.clear {
                    border: 0;
                    color: $orange-auto;
                    background: none;
                    cursor: pointer;
                    &:hover {
                        color: $red-select;
                    }
                }
            }
        }
    }
}
@media (max-width: 600px){
    .table-filter{
        .table-filter-item{
            float:none!important;
            .el-form-item{
                .el-form-item__label{
                    float:left;
                }
                .el-form-item__label + .el-form-item__content{
                    margin-left: 100px;
                }
                .el-input,.el-select{
                    width:100%!important;
                }
                &:after{
                    content:"";display: block;clear: both;
                }
            }
        }
        .table-filter-select{
            .label{
                float:left;
            }
            .det{
                display: block;
                margin-left: 150px;
                .el-input__inner{
                    width:100%;
                }
            }
        }
    }
}
</style>