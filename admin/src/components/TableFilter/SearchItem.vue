<template>
	<div class="search-item">
		<!--所有input框-->
	    <el-input v-if="typeof(current.type) == 'undefined' ||current.type=='input'" v-model="listQuery[current.prop]" :placeholder="'请输入'+current.label" :minLength="current.minLength" :maxLength="current.maxLength" clearable @clear="onChange"></el-input>

	    <!--所有select-->
	    <el-select v-if="current.type=='select'" v-model="listQuery[current.prop]" @change="onChange" @clear="onChange" :filterable="current.filterable" :remote="current.remote" :remote-method="selectRemoteMethod" popper-class="search-select-item">
	        <el-option value="" label="全部" v-if="current.all"></el-option>
	        <el-option v-for="(item,index) in current.selectList" :value="item[current.valueKey||'value']" :label="item[current.labelKey||'label']||item['displayName'] || (current.getLabel && current.getLabel(item))" :key='index'>
	        	<div v-html="item[current.labelKey||'label'] || item['displayName']|| (current.getLabel && current.getLabel(item))" ></div>
      			<div class="desc" v-if="current.labelDesc" v-html="item[current.labelDesc]"></div>
	        </el-option>
	    </el-select>
		<!-- 所有radio -->
		<el-radio-group v-if="current.type=='radio'" v-model="listQuery[current.prop]" class="filter-radio-group" @change="onChange">
			<el-radio-button v-if="current.all" label="">全部</el-radio-button>
			<el-radio-button v-for="(item,index) in current.selectList" :label="item[current.valueKey||'value']" :key='index'>{{item[current.labelKey||'label']||item['displayName'] || (current.getLabel && current.getLabel(item))}}</el-radio-button>
		</el-radio-group>

		<el-autocomplete v-if="current.type=='autocomplete'" v-model="listQuery[current.prop]" :fetch-suggestions="autoSearch" placeholder="请输入内容" :value-key="current.value?current.value:current.valueKey" style="width: 100%;" clearable @select="onChange" @clear="onChange">
			<template slot-scope="{ item }">
				<div v-if="current.labelKey" :class="[current.labelKey?'autocomplete-row':'']">{{item[current.labelKey]}}</div>
				<div v-if="current.valueKey" :class="[current.labelKey?'autocomplete-row color-gray autocomplete-gray':'']">{{item[current.valueKey]}}</div>
			</template>
		</el-autocomplete>
	    <!--时间范围-->
	    <el-date-picker v-if="['daterange','monthrange','datetimerange'].indexOf(current.type)>-1" v-model="listQuery[current.prop]" :type="current.type" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @change="onChange()" :picker-options="current.pickerOptions" :format="current.format || 'yyyy-MM-dd'" :value-format="current.valueFormat || 'yyyy-MM-dd'" style="width:250px"></el-date-picker>
	    <!--时间-->
		<el-date-picker v-if="['week','date','month'].indexOf(current.type)>-1" v-model="listQuery[current.prop]" :clearable='!current.deletion' :type="current.type" placeholder="选择日期" :picker-options="current.pickerOptions" :format="current.format || 'yyyy-MM-dd'" :value-format="current.valueFormat || 'yyyy-MM-dd'" style="width:100%" @change="onChange()"></el-date-picker>
	
	</div>
</template>
<script>
export default{
	components:{ },
	props:{
		current:{
			type: Object,
			default:{}
		},
		listQuery:{
			type: Object,
			default:{}
		}
	},
    watch:{
    	current:{
    		immediate: true,
            handler (newVal, oldVal) {
            	/*这里判断值是否变化，变化就触发你想要做的事 do something*/
            	if(newVal &&(!oldVal || (oldVal&&newVal.prop!=oldVal.prop))){
            		this.init()
            	}
            }
    	},
    },
	methods:{
		init(){
            if(this.current.remote && !this.current.selectList.length){
                this.selectRemoteMethod()
            }
        },
        selectRemoteMethod(query,cb) {
        	var opt = {
        		...this.current.params
        	};
        	opt[this.current.searchKey||'name']=query
            this.current['remoteMethod'] && this.current['remoteMethod'](opt).then(res => {
                // this.current.selectList = res.result.data || res.result;
				this.$set(this.current,'selectList',res.result.data || res.result)
				this.$forceUpdate();
                // cb && cb(res.result.data || res.result)
            })
        },
		onChange(){
			this.$emit('change')
			// if(this.current.remote){
			// 	this.selectRemoteMethod()
			// }
		},
		autoSearch(query, cb){
			var opt = {
        		...this.current.params,
        		cloudType:this.listQuery.cloudType
        	};
        	opt[this.current.searchKey||'name']=query
			this.current.search(opt).then(res=>{
				this.$set(this.current,'selectList',res.result.data || res.result)
				cb(this.current.selectList)
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.autocomplete-row{
    line-height:1.6;
    // font-size: 12px;
}
.autocomplete-gray{
	font-size: 12px;
	color: #999;
}

</style>