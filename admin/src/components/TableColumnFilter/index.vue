<!--
 * @description     定制表头
 *
 * @author          涂重阳
 * @email           779311998@qq.com
 * @phone           18707133663
 * @create          2019-12-17 15:00
-->
<template>
    <el-dropdown class="table-column-filter" trigger="click" :hide-on-click="false">
    	<el-button type="text" icon="el-icon-document" size="mini" title="自定义表头">
            <!-- {{$t('common.customHeader')}}<i class="el-icon-arrow-down el-icon--right"></i> -->
        </el-button>
        <el-dropdown-menu slot="dropdown" class="cloud-filter-dropdown-content">
            <el-dropdown-item v-for="item in items" :command="item.prop" :key="item.prop">
            	<el-checkbox  v-model="item.show" :key="item.prop" @change="handleChange(item)" @click.stop>{{item.label}}</el-checkbox>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>

export default {
    data() {
        return {
        }
    },
    props: {
        model: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default: []
        }
    },
    created() {
        
    },
    methods: {
        handleChange(data) {
            
        }
    }
}
</script>
<style lang="scss" scoped>
.table-column-filter{
    // float: right;
    // margin-bottom: 10px;
}
.cloud-filter-dropdown-content{
	min-width: 140px;
	/deep/{
		.el-dropdown-menu__item{
			padding: 0;
		}
		.el-checkbox{
			display: block;
			padding: 0 17px;
		}
	}
}
</style>