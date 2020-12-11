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
    <div class="table-filter" v-if="filterList.length || typeof(query.cloudType)!='undefined'">
        <!--云平台-->
        <ul class="cloud-types" v-if="typeof(query.cloudType)!='undefined'">
            <li :class="{active:query.cloudType==''}" v-if="(typeof(listQuery.cloudType)=='object' && (typeof(listQuery.cloudType.all)==='undefined'||listQuery.cloudType.all))||typeof(listQuery.cloudType)=='string'" @click="selectCloudType('')">全部</li>
            <li v-for="item in cloudPlatforms" :key='item.code' :class="{active:query.cloudType==item.code}" @click="selectCloudType(item.code)">{{item.name}}</li>
        </ul>
        <!--镜像类型-->
        <ul class="imageOwnerAlias" v-if="typeof(query.imageOwnerAlias)!='undefined'">
            <li v-for="item in ImageOwnerAliasList" :key='item.value' :class="{active:query.imageOwnerAlias==item.value}" @click="selectImageOwnerAlias(item.value)">{{item.title}}</li>
        </ul>
        <div class="main" v-if="filterList.length">
            <div class="table-filter-item table-filter-select" v-if="showType=='mini'">
                <div class="label" :style="{width:labelWidth+(labelWidth.indexOf('px')<=-1?'px': '')}">
                    <el-select v-model="current" value-key="searchType">
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
                <el-form @submit.native.prevent="search" class="common-form" inline>
                    <el-form-item v-for="(item,index) in filterList" :label="item.label" :label-width="item.labelWidth" :key="index">
                        <SearchItem :current.sync="item" :listQuery="query" @change="onChange"></SearchItem>
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
import { cloudPlatform } from '@/utils/cloudPlatform';
import {deepClone} from '@/utils';
import { constantMap } from '@/utils/constant';
import { time } from '@/filters';
import SearchItem from './SearchItem'
import searchList from './searchList'
export default {
    components: {SearchItem},
    props: {
        filters: {
            type: Array,
            default: () => {
                return []
            }
        },
        listQuery: {
            type: Object,
            default: () => {
                return {}
            }
        },
        labelWidth: {
            type: String,
            default: '150'
        },
        auto: {
            type: Boolean,
            default: true
        },
        cloudTypes: {
            type: String,
            default: Object.keys(cloudPlatform).join(',')
        }
    },
    watch:{
        listQuery:{
            deep: true,
            handler(val){
                this.initQuery();
            }
        }
    },
    computed: {
        
    },
    data() {
        return {
            searchList: searchList,
            // cloudPlatforms: Object.values(cloudPlatform).filter(item => item.status == 1),
            cloudPlatforms: Object.values(cloudPlatform).filter(item => item.status && this.cloudTypes.indexOf(item.code) > -1),
            ImageOwnerAliasList:constantMap.ImageOwnerAlias,
            current: {},
            /* 用于组件内部的listQuery */
            query:{},
            /*检索项*/
            filterQuery: [],
            filterList:[],
            /*daterangeModel*/
            showType: localStorage.getItem('tableFilterType') || 'mini'
        }
    },
    created() {
        this.initQuery();
        this.init();
    },
    methods: {
        init() {
            this.filterList = this.getFilterList()
            if (this.filterList.length) {
                this.current = this.filterList[0];
                this.packQuery()
            }
        },
        initQuery(){
            for(let i in this.listQuery){
                var v = this.listQuery[i]
                if(v && typeof v ==='object'){
                    this.$set(this.query, i, v.value||'')
                }else{
                    this.$set(this.query, i, v)
                }
            }
            // console.log(this.query,'query')
        },
        /*通过listQuery，生成一个新的筛选项集合*/
        getFilterList() {
            let list = deepClone(this.searchList)
            return list.filter(item => {
                if (['regionId', 'regionIds','regionName'].indexOf(item.searchType) > -1 && !this.query.cloudType) {
                    return false;
                }
                if (['masterZoneId'].indexOf(item.searchType) > -1 && (!this.query.cloudType || !this.query.regionId)) {
                    return false;
                }
                for (var i in this.query) {
                    if (['pageIndex', 'pageSize', 'cloudType','imageOwnerAlias'].indexOf(i) <= -1 && item.searchType == i) {
                        if(this.listQuery[i] && typeof this.listQuery[i] ==='object'){
                            for(let l in this.listQuery[i]){
                                if(typeof item[l] !== 'undefined'){
                                    item[l] = this.listQuery[i][l]
                                }
                            }
                        }
                        return true
                    }
                }
                return false;
            });
        },
        setQueryValue(key,value){
            if(typeof this.listQuery[key] ==='object'){
                this.$set(this.listQuery[key], 'value', value)
            }else{
                this.$set(this.listQuery, key, value)
            }
        },
        packQuery(){
            var searchItem = this.searchList.find(item => item.searchType == this.current.searchType);
            var filterItem = this.filterQuery.find(item => item.searchType == this.current.searchType);
            var value = this.query[this.current.searchType]
            if (typeof filterItem !== 'undefined') {
                /*当输入值为空时*/
                if (value === ''|| (typeof value==='array' && !value.length)) {
                    for (var i = 0; i < this.filterQuery.length; i++) {
                        if (this.filterQuery[i].searchType === this.current.searchType) {
                            this.filterQuery.splice(i, 1); break;
                        }
                    }
                } else {
                    this.$set(filterItem, 'searchValue', value)
                }
            } else {
                if(value==='' || (typeof value==='array' && !value.length)){
                    return;
                }
                this.$set(searchItem, 'searchValue', value)
                this.filterQuery.push(searchItem);
            }
        },
        search() {
            this.packQuery()
            this.change();
        },
        onRegionChange() {
            for (var i = 0; i < this.filterQuery.length; i++) {
                if (this.filterQuery[i].searchType == 'masterZoneId') {
                    this.filterQuery.splice(i, 1);
                }
            }
        },
        /*获取检索项的key值*/
        getLabelName(data) {
            var current = this.filterList.find(item => item.searchType == data.searchType);
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
            if (['daterange','monthrange','datetimerange'].indexOf(data.type)>-1) {
                return data.searchValue.join(' - ')
            }
			if(['cloudCreateTime','createTime','openTime'].indexOf(data.searchType)>-1){	
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
        change() {//console.log(JSON.stringify(this.filterList),'filterList1')
            for(let i in this.listQuery){
                this.setQueryValue(i,this.query[i]);
            }
            // console.log(JSON.stringify(this.filterList),'filterList1')
            this.$emit('update:listQuery', this.listQuery);//console.log(this.filterList,'filterList');return
            this.$emit('change');
        },
        selectCloudType(code) {
            this.query.cloudType = code;
            if (this.query.regionId || this.query.regionIds) {
                for (var i = 0; i < this.filterQuery.length; i++) {
                    if (this.filterQuery[i].searchType == 'regionId') {
                        this.filterQuery.splice(i, 1);
                    }
                    if (this.filterQuery[i].searchType == 'regionIds') {
                        this.filterQuery.splice(i, 1);
                    }

                }

                this.query.regionId && (this.query.regionId = "");
                this.query.regionIds && (this.query.regionIds = "");
            }
            if (this.filterQuery.length) {
                for (var j = 0; j < this.filterQuery.length; j++) {
                    if (this.filterQuery[j].searchType == 'masterZoneId') {
                        this.filterQuery.splice(j, 1);
                    }
                }
                this.query.masterZoneId && (this.query.masterZoneId = "");
            }
            this.init();
            this.change();
        },
        selectImageOwnerAlias(value){
            this.query.imageOwnerAlias = value;
            this.init();
            this.change();
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
    .table-filter-item.table-filter-high{
        float: left;
        margin-bottom: 0;
        /deep/{
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
                height: 20px;
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
    .cloud-types {
        margin-bottom: 10px;
        text-align: left;
        li {
            display: inline-block;
            padding: 0 25px;
            height: 28px;
            line-height: 28px;
            border: 1px solid $gray-3;
            border-radius: 30px;
            margin: 0 5px;
            cursor: pointer;

            &.active {
                border: 1px solid $red-select;
                background-color: $red-select;
                color: #fff;
            }

            &:hover {
                border-color: $red-select;
            }
            &[disabled],
            &[disabled]:hover {
                cursor: not-allowed;
                color: $gray-2;
                border-color: $gray-3;
            }
        }
    }
    .imageOwnerAlias{
        margin-bottom: 10px;
        text-align: left;
        li {
            display: inline-block;
            padding: 0 25px;
            height: 28px;
            line-height: 28px;
            border: 1px solid $gray-3;
            border-radius: 30px;
            margin: 0 5px;
            cursor: pointer;

            &.active {
                border: 1px solid $red-select;
                background-color: $red-select;
                color: #fff;
            }

            &:hover {
                border-color: $red-select;
            }
            &[disabled],
            &[disabled]:hover {
                cursor: not-allowed;
                color: $gray-2;
                border-color: $gray-3;
            }
        }
    }
}
</style>