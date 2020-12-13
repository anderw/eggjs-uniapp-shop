<template>
	<div>
		<!-- input 具体样式可以传style控制 -->
		<el-input v-model="form[item.prop]" :readonly='item.readonly'  :style="item.style" :type="item.proptype || 'text'" :label="item.label" v-if="typeof(item.formtype)=='undefined' || item.formtype=='input'" clearable></el-input>
		<!-- item.unit 是一个对象，unit对象里可以传 style 和lable  lable是必传项，lable可以是个字符串也可以是个function，unit默认浮动，左右距离可以传style控制-->
		<span class="form-unit" :style="item.unit.style" v-if="item.unit && item.unit.lable">{{unitLable(item)}}</span>
		<!-- formtype 为 select-->
		<template v-if="item.formtype=='select'">
			<el-select v-model="form[item.prop]" placeholder="" :disabled='!!item.disabled' :filterable="item.filterable" :remote="item.remote"  :multiple="item.multiple" :remote-method="selectRemoteMethod" :clearable='item.clearable' @change="onChange()">
				<el-option v-for="option in item.options" :key="option[item.valueKey || 'value']" :label="option[item.labelKey||'label']  || item.getLabel(option)" :value="option[item.valueKey||'value']" :disabled="option.disabled"></el-option>
			</el-select>
		</template>
		<template v-if="item.formtype=='radio'">
			<el-radio-group v-model="form[item.prop]" :disabled='!!item.disabled'>
				<el-radio v-for="option in item.options" :key="option[item.valueKey || 'value']"  :label="option[item.valueKey||'value']" :disabled="option.disabled">{{option[item.labelKey||'label']  || item.getLabel(option)}}</el-radio>
			</el-radio-group>
		</template>
		<!-- formtype 为 时间类型的-->
		<template v-if="['week','date','month','daterange','monthrange'].indexOf(item.formtype)>-1">
				<div class="date-label is-active">{{ item.label }}</div>
				<el-date-picker
					v-model="form[item.prop]"
					:format="item.format"
					:value-format="item.valueFormat"
					:type="item.formtype"
					:picker-options="item.pickerOptions"
				></el-date-picker>
		</template>
		<!-- formtype 为 radio-->
		<template v-if="item.formtype=='radio'">
			 <el-radio-group v-model="form[item.prop]">
				 <!--radioList 是个数组，example:radioList:[{value:'',name:''}]-->
			    <el-radio v-for='radio in item.radioList' :key='radio.value' :label="radio.value">{{radio.name}}</el-radio>
			  </el-radio-group>
		</template>
		
		<template v-if="item.formtype=='file'">
			<FileUploader :files.sync="form[item.prop]" :single="true"></FileUploader>
		</template>
		
		<el-tooltip class="item" effect="dark" placement="right"  v-if="item.tooltip">
		      <el-button type='text' icon='el-icon-question'></el-button>
			  <div slot='content' v-html="tooltipText(item)"></div>
		</el-tooltip>
	</div>
</template>
<script>
import FileUploader from '@/components/FileUploader'
export default{
	components: {
		FileUploader
	},
	props:{
		item:{
			type: Object,
			default(){
				return {}
			}
		},
		form:{
			type: Object,
			default(){
				return {}
			}
		},
		schema:{
			type: Array,
			default(){return []}
		},
	},
	created(){
		if(this.item.remote && this.item.remoteMethod){
			this.selectRemoteMethod();
		}
	},
	methods:{
		tooltipText(data){
			if(data && data.tooltip instanceof Function ){
				return data.tooltip(this.form)
			}else{
			    return data.tooltip
			}
		},
		unitLable(data){
		    if(data.unit && data.unit.lable instanceof Function ){
				return data.unit.lable(this.form)
		    }else{
		        return data.unit.lable
		    }
		},
		selectRemoteMethod(query){
			var params = {}
			if(this.item && this.item.searchKey){
				params[this.item.searchKey] = query
			}
			if(this.item.params){
				params = this.item.params;
                params[this.item.searchKey] = query;
			}
			this.item['remoteMethod'](params).then(res=>{
				var list = res.result;
				if(res.result.data){
					list = res.result.data;
				}
				if(this.item && this.item.beforeSelect && this.item.beforeSelect instanceof Function){
					// beforeSelect 是一个方法，如果需要过滤下拉列表里的数据时可以通过beforeSelect方法
					list = this.item.beforeSelect(list,this.form)
				}
				this.$set(this.item,'options',list)
			})
		},
		onChange(data){
			let cur = this.item.options.find(item=>item[this.item.valueKey||'value']==this.form[this.item.prop])
			if(this.item.change && typeof this.item.change ==='function'){
				this.item.change(cur,this.form)
			}
			this.$emit('change',cur)
		},
	}
}
</script>
<style lang="scss" scoped>
	.form-unit{
		position: absolute;top: 5px;
	}
	.date-label{
		position: absolute;
	    color: #aaa;
	    pointer-events: none;
	    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
	    transform-origin: top left !important;
	    white-space: nowrap;
	    &.is-active{
	        transform: translateY(-15px) scale(0.8);
			z-index: 999;
			
	    }
	}
</style>