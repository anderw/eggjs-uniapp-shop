<template>
	<el-table-column :prop="item.prop" :align="item.align"  sortable class-name="text-column" :fixed="fixed" :width='item.width'>        
		<template slot="header" slot-scope="scope" >
			{{item.header?item.header:item.label}}
		</template>
		<template slot-scope="scope" >
			<slot :name="item.prop" v-if="hasSlot" :row="scope.row"></slot>
			<span v-else>
				<el-tooltip class="icon-after" effect="dark" placement="right" :open-delay="300" :tabindex="-1" :disabled="!item.tooltip || (item.prop.indexOf(',')<=-1) && !scope.row[item.prop]||scope.row[item.prop]==='--'">
					<div :class="typeof(item.break)==='undefined' || item.break?'break-word':''">
						<span v-html="getCustomContent(item,scope.row)"></span>
					</div>
					<div slot="content" style="max-width: 400px; max-height: 300px;overflow-y: auto;" v-if="!(!item.tooltip || (item.prop.indexOf(',')<=-1) && !scope.row[item.prop]||scope.row[item.prop]==='--')">
                            <div v-if="typeof(item.tooltip) ==='object' || typeof(item.tooltip) ==='function'" v-html="getContent(item,scope.row)"></div>
                            <div v-else>
                                <span v-html="getCustomContent(item,scope.row)"></span>
                            </div>
					</div>
				</el-tooltip>
			</span>
		</template>
    </el-table-column>
</template>
<script>
export default{
	props:{
		item:{
			type: Object,
			default:{}
		},
		type:{
			type: String,
			default:''
		},
		fixed:{
			type:String,
			default: undefined
		},
		hasSlot:false
	},
	methods:{
        getContent(data,row){     
           	if(data && typeof data.tooltip ==='object' && data.tooltip.content instanceof Function ){
           		return data.tooltip &&data.tooltip.content(this.item,row)
           	}else{
               	return data.tooltip
           	}
           
		},
		getCustomContent(data,row){
			var filterParams = data.filterParams||[]
			return data.filter && data.filter(row[data.prop], ...filterParams) || this.$options.filters['emptyFilter'](row[data.prop])
		}
	}
}
</script>