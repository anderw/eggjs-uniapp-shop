<template>
    <div class="table-container" @mousemove="onMousemove" @mousedown="onMousedown" @mouseup="onMouseup">
        <TableColumnFilter :items="filterColumns" ></TableColumnFilter>
        <el-table ref="multipleTable" class="hyperone-table table" v-bind="$attrs" border :data="list" fit style="width: 100%"  tooltip-effect="dark" highlight-current-row v-loading="loading" @row-click="onRowClick" @row-contextmenu="onRowContextmenu" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" class-name="hide-column" v-if="selection"></el-table-column>
            <el-table-column type="index" v-if="index" label="序号" fixed="left" width="55"></el-table-column>
            <!--表格列-->
            <template v-if="columnItems.length">
                <template v-for="(item,index) in columnItems">
                    <el-table-column v-if="item.children && item.children.length" :label="item.label" :fixed="index==0?'left':undefined" :key="index">
                        <template v-for="(citem,i) in item.children">
                            <TableItem :item="citem" :key="i" :hasSlot="!!$scopedSlots[item.prop]" v-if="typeof(citem.show)=='undefined' || citem.show">
                                <slot :name="item.prop" :slot="item.prop" slot-scope="scope" :row="scope.row"></slot>
                            </TableItem>
                        </template>
                    </el-table-column>
                    <template  v-else>
                        <TableItem :item="item" :hasSlot="!!$scopedSlots[item.prop]" v-if="typeof(item.show)=='undefined' || item.show" :key="index" :fixed="index == 0 ? 'left' : (item.fixed || undefined)">
                            <slot :name="item.prop" :slot="item.prop" slot-scope="scope" :row="scope.row"></slot>
                        </TableItem>
                    </template>
                </template>
            </template>
            <template slot="empty" v-if="!loading"><slot name="empty"></slot></template>
            
        </el-table>
        <div class="table-control" v-if="selection || $scopedSlots.control">
            <span class="select-tip" v-if="selection">已选 {{multipleSelection.length}} 条</span>
            <slot name="control" :multipleSelection="multipleSelection"></slot>
        </div>
		<div style="overflow: hidden;">
			<pagination :total="total" :pageIndex.sync="listQuery.page" :limit.sync="listQuery.pageSize" @pagination="getList" />
		</div>
    </div>
</template>
<script>
    import Pagination from '@/components/Pagination';
    import TableColumnFilter from '@/components/TableColumnFilter'
import {mapGetters} from 'vuex';
import {deepClone} from '@/utils'
import TableItem from './TableItem';
import PagerSelf from '@/components/PagerSelf';
export default {
    name:'TableMain',
    components:{Pagination,TableColumnFilter,TableItem,PagerSelf},
    props:{
        columnItems:{type:Array,default(){return []}},
        listQuery: {type: Object,default(){return {page:1,pageSize:10}}},
        selection: false,
        index: false,
        api: null
    },
    watch:{
    },
    data(){
        return {
            list:[],
            loading: false,
            multipleSelection:[],
            filterColumns:[],
            total: 0,
            i:1,
            mouseEvent:{
                sx:0, sy:0,ex: 0, ey:0,moveable:false,isMoved:false//是否移动了，如果移动了，就阻止click事件
            }
        }
    },
    created(){
        this.init()
    },

    methods:{
		init(){
            if(this.api){
                this.getList();//默认从api
            }
            this.getColumns();
		},
        getList(options){
            this.$emit('before')
            this.loading = options&&typeof(options.loading)!=='undefined'?options.loading:true;
            this.api(this.listQuery).then(res=>{
                this.loading = false;
                this.list = res.result.rows||res.result;
                this.total = res.result.count||0;
                this.$emit('success',this.list);
            }).catch((err)=>{
                this.loading = false;
            })

        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.$emit('selection-change',val)
        },
        query(){
            this.listQuery.page=1;
            this.list = [];
            this.getList();
        },
        refresh(){
            this.list = [];
            this.getList();
        },
        onRowClick(row, column, event){
            if(!this.mouseEvent.isMoved){
                this.$emit('row-click',row,column,event)
            }
        },
        onRowContextmenu(row, column, event){
            this.$emit('row-contextmenu',row,column,event)
        },
        getColumns(){
            var result1 = []
            this.columnItems.forEach(item=>{
                if(item.children && item.children.length){
                    item.children.forEach(citem=>{
                        result1.push(citem)
                    })
                }else{
                    result1.push(item)
                }
            })
            this.filterColumns = result1

        },
        onMousedown(e){
            this.mouseEvent.moveable=true;
            this.mouseEvent.isMoved=false;
            this.mouseEvent.sx=this.mouseEvent.ex=e.pageX;
            this.mouseEvent.sy=this.mouseEvent.ey=e.pageY;
        },
        onMousemove(e){
            if(this.mouseEvent.moveable){
                this.mouseEvent.ex=e.pageX;
                this.mouseEvent.ey=e.pageY;
            }
        },
        onMouseup(){
            this.mouseEvent.moveable=false;
            //横坐标移动超过10px，
            if(Math.abs(this.mouseEvent.ex-this.mouseEvent.sx)>=5){
                this.mouseEvent.isMoved=true;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.table-container{
    position: relative;
    /deep/{
        .table-column-filter{
            // margin-top: -30px;
            position: absolute;
            left: 100%;
            top: 7px;
            margin-left: 3px;
        }
    }
    .break-word{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
.currentPage{
	margin-top: 25px;
	font-size: 12px;
	color: #808080;
}

.hyperone-table {
    z-index: 10;
    /deep/{
        .el-table__body-wrapper{
            &::-webkit-scrollbar{
                height:10px;
            }
            &::-webkit-scrollbar-thumb{
                border-radius: 15px;
            }
        }
        

    }
    &.el-table--scrollable-x{
        /deep/{
            .el-table__fixed, .el-table__fixed-right{
                height: auto!important;
                bottom:10px;
            }
        }
    }
}

</style>
