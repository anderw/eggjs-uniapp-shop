<template>
	<div class="base-info">
		<div class="title-bar"><div class="title">{{title}}</div></div>
		<div class="table" border="1" cellpadding="0" cellspacing="0" bordercolor="#E7E7E7"  v-if="list.length">
			<div v-for="(item,i) in list" :key='i' class="tab-row">
				<!-- 用户类型 -->
				<div class="tab-header" :style="{width:width+'px'}">{{item.title}}</div>
				<div class="tab-main"  :style="{'margin-left':width+'px','text-align':align}">
                    <template v-if="$scopedSlots[item.slot]">
                        <slot :name="item.slot" :row="item"></slot>
                    </template>
					<span v-else v-html="valueFilter(item.value)"></span>
					<el-tooltip v-if='item.tooltip' style="position: static;" effect="dark" placement="right-start">
						<el-button type="text" size="mini" icon="el-icon-question"></el-button>
						<div slot="content" v-html="typeOf(item.tooltip) == 'string'?item.tooltip:item.value" style="max-width: 200px;margin-left: 5px;"></div>
					</el-tooltip>
					<template v-if="item.btns && item.btns.length">
						<div class="btn-group">
							<el-button v-for="(btn,index) in item.btns" :key="index" :icon="btn.icon" @click="btn.click" size="mini">{{btn.label}}</el-button>
						</div>
					</template>
				</div>
			</div>
            <div class="bg"  :style="{width:width+'px'}"></div>
		</div>
        <span v-if="!$slots.default && !list.length">暂无数据</span>
		<slot name="default"></slot>
	</div>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: ()=>{
                    return []
                }
			},
			width:{
				type: Number,
				default: 120
			},
			title:{
				type: String,
				default: ''
			},
            // 控制表格内容的居中方式
            align:{
                type: String,
                default: 'left'
            }
		},
		data() {
			return {
				edit:true,
				data:{},
				name:'',
				value:''
			}
		},

		created(){
		    console.log(this,'=========')
		},

		methods:{
			valueFilter(val){
				return val?val:'--'
			}
		}
		
			
	}
</script>

<style scoped lang="scss">
.base-info{
	margin-bottom: 30px;
}
.table{
	border-collapse: collapse;
	width:100%; 
    min-height:100px;
	overflow: hidden;
    position: relative;
    .bg{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background: #f2f2f2;
        
    }
}
.tab-row{
    position: relative;
    z-index: 10;
    border: 1px solid #E7E7E7;
    border-top: none;
}
.tab-row:first-child{
    border-top: 1px solid #E7E7E7;
}
    .tab-header,.tab-main{
        padding: 5px 10px;
    }
	.tab-header {
        float: left;
		text-align: right;
		padding: 5px;
		font-size: 12px;
		// background: #f2f2f2;
		color: #434343;
        //width: 200px;
	}
	.tab-main {
		text-align: left;
		padding-left:10px;
		font-size: 12px;
        word-break: break-all;
		img{
			max-width: 100%;
		}
	}
	.title-bar{
		margin-bottom: 10px;
		.title{
			line-height: 1;
			border-left: 4px solid #666;
			padding-left: 10px;
		}
	}
	.btn-group{
		display: inline-block;
		margin-left: 20px;
	}
    
    @media (max-width: 600px){
        .table{
            .bg{
                display: none;
            }
            .tab-row{
                margin-bottom: 10px;
                border-top: 1px solid #E7E7E7;
            }
        }
        
        .tab-header{
            float: none;
            width: 100%!important;
            text-align: left;
            background: #f2f2f2;
            padding: 5px 10px;
        }
        .tab-main {
            margin-left: 0!important;
        }
    }
</style>
