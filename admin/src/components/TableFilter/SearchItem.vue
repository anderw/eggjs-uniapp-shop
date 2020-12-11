<template>
	<div class="search-item">
		<!--所有input框-->
	    <el-input v-if="current.type=='input'" v-model="listQuery[current.searchType]" :placeholder="'请输入'+current.label" :minLength="current.minLength" :maxLength="current.maxLength" clearable @clear="onChange"></el-input>

	    <!--所有select-->
	    <el-select v-if="current.type=='select'" v-model="listQuery[current.searchType]" @change="onChange" @clear="onChange" :filterable="current.filterable" :remote="current.remote" :remote-method="selectRemoteMethod" popper-class="search-select-item">
	        <el-option value="" label="全部" v-if="current.all"></el-option>
	        <el-option v-for="(item,index) in current.selectList" :value="item[current.valueKey||'value']" :label="item[current.labelKey||'label']||item['displayName'] || (current.getLabel && current.getLabel(item))" :key='index'>
	        	<div v-html="item[current.labelKey||'label'] || item['displayName']|| (current.getLabel && current.getLabel(item))" ></div>
      			<div class="desc" v-if="current.labelDesc" v-html="item[current.labelDesc]"></div>
	        </el-option>
	    </el-select>
	    <div v-if="current.type=='autocomplete'">
	        <!--所有select:accountNameEnt-->
	        <el-autocomplete v-if="current.searchType=='accountNameEnt' " v-model="listQuery[current.searchType]" :fetch-suggestions="autoSearch" placeholder="请输入内容" :value-key="current.valueKey" style="width: 100%;" clearable @select="onChange" @clear="onChange">
	            <template slot-scope="{ item }">
	                <div class="account-name" style="line-height: 1.6;font-size:12px;padding-top: 5px;">{{ item.name }}</div>
	                <div class="account-id color-gray" style="line-height: 1.6;font-size: 12px;">{{ item.accountId }}</div>
	            </template>
	        </el-autocomplete>
	        <!--所有select:customerId-->
	        <el-autocomplete v-else-if="['customerId','clienteleId'].indexOf(current.searchType)>-1" v-model="listQuery[current.searchType]" :fetch-suggestions="autoSearch" placeholder="请输入内容" :value-key="current.valueKey" style="width: 100%;" clearable @select="onChange" @clear="onChange">
	            <template slot-scope="{ item }">
	                <div class="account-name" style="line-height: 1.6;font-size:12px;padding-top: 5px;">{{ item.name }}</div>
	                <div class="account-id color-gray" style="line-height: 1.6;font-size: 12px;">{{ item.id }}</div>
	            </template>
	        </el-autocomplete>
	        <!--所有select:accountIdCus-->
	        <el-autocomplete v-else-if="current.searchType=='accountIdCus'" v-model="listQuery[current.searchType]" :fetch-suggestions="autoSearch" placeholder="请输入内容" :value-key="current.valueKey" style="width: 100%;" clearable @select="onChange" @clear="onChange">
	            <template slot-scope="{ item }">
	                <div class="account-name" style="line-height: 1.6;font-size:12px;padding-top: 5px;">{{ item.name }}</div>
	                <div class="account-id color-gray" style="line-height: 1.6;font-size: 12px;">{{ item.accountId }}</div>
	            </template>
	        </el-autocomplete>
			<!--所有select:INTLBillaccount-->
			<!-- <el-autocomplete v-else-if="current.searchType=='INTLBillaccount'" v-model="listQuery[current.searchType]" :fetch-suggestions="autoSearch" placeholder="请输入内容" :value-key="current.valueKey" style="width: 100%;" clearable @select="onChange" @clear="onChange">
			    <template slot-scope="{ item }">
			        <div class="account-name" style="line-height: 1.6;font-size:12px;padding-top: 5px;">{{ item.email }}</div>
			        <div class="account-id color-gray" style="line-height: 1.6;font-size: 12px;">{{ item.accountId }}</div>
			    </template>
			</el-autocomplete> -->
			
	        <el-autocomplete v-else v-model="listQuery[current.searchType]" :fetch-suggestions="autoSearch" placeholder="请输入内容" :value-key="current.value?current.value:current.valueKey" style="width: 100%;" clearable @select="onChange" @clear="onChange">
                <template slot-scope="{ item }">
                    <div v-if="current.labelKey" :class="[current.labelKey?'autocomplete-row':'']">{{item[current.labelKey]}}</div>
                    <div v-if="current.valueKey" :class="[current.labelKey?'autocomplete-row color-gray autocomplete-gray':'']">{{item[current.valueKey]}}</div>
                </template>
	        </el-autocomplete>
	    </div>

	    <!--时间范围-->
	    <el-date-picker v-if="['daterange','monthrange','datetimerange'].indexOf(current.type)>-1" v-model="listQuery[current.searchType]" :type="current.type" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @change="onChange()" :picker-options="current.pickerOptions" :format="current.format || 'yyyy-MM-dd'" :value-format="current.valueFormat || 'yyyy-MM-dd'" style="width:250px"></el-date-picker>
	    <!--时间-->
		<el-date-picker v-if="['week','date','month'].indexOf(current.type)>-1" v-model="listQuery[current.searchType]" :clearable='!current.deletion' :type="current.type" placeholder="选择日期" :picker-options="current.pickerOptions" :format="current.format || 'yyyy-MM-dd'" :value-format="current.valueFormat || 'yyyy-MM-dd'" style="width:100%" @change="onChange()"></el-date-picker>
	    <!-- <el-date-picker v-if="['week','date','month'].indexOf(current.type)>-1" v-model="listQuery[current.searchType]" :clearable='!current.deletion' :type="current.type" :placeholder="$t('common.selectDate')" :picker-options="current.pickerOptions" :format="current.format || 'yyyy-MM-dd'" :value-format="current.valueFormat || 'yyyy-MM-dd'" style="width:100%" @change="onChange()"></el-date-picker> -->

	    <!--地域选择-->
	    <RegionSelect v-if="current.type=='region' && listQuery.cloudType" @change="onChange" :model.sync="listQuery[current.searchType]" :cloudType="listQuery.cloudType" :list.sync="current.selectList" :valueKey="current.valueKey" :checkbox="current.checkbox"></RegionSelect>
	    <!--可用区选择-->
	    <ZoneSelect v-if="current.type=='zone'&&listQuery.cloudType&&listQuery.regionId" :model.sync="listQuery[current.searchType]" :cloudType="listQuery.cloudType" :list.sync="current.selectList" :regionId="listQuery.regionId" show-all></ZoneSelect>

	    <!--  -->
	    <OsVersion v-if="current.type=='OsVersion' " :single="true" :sysType.sync="listQuery[current.searchType]" :list.sync="current.selectList" @change="onChange()"></OsVersion>

	
	</div>
</template>
<script>
import RegionSelect from '@/components/RegionSelect';
import ZoneSelect from './components/ZoneSelect';
import OsVersion from '@/components/OsVersion';
export default{
	components:{ ZoneSelect, RegionSelect, OsVersion},
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
            	if(newVal &&(!oldVal || (oldVal&&newVal.searchType!=oldVal.searchType))){
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