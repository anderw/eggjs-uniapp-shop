<template>
    <el-dialog :title="title" v-if="svisible" :visible.sync="visible" width="600px" :close-on-click-modal="false" :before-close="handleClose">
		<div class="form-alert">
			<el-alert
			    :title="alert.title"
			    :type="alert.type"
			    :closable="false"
				v-if="alert && alert.title">
			  </el-alert>
		</div>
	
        <Form :initData="form" :schema="schema" :rules="rules" :api="api" :beforeSubmit="beforeSubmit" @cancel="handleClose" @submit="onSubmit"></Form>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="visible = false">确 定</el-button>
        </span> -->
    </el-dialog>
</template>
<script>
    import Form from './Form';
    import {mapGetters} from 'vuex';
export default{
    'component-name':'formDialog',
    components:{Form},
	data(){
		return {
            title: '提示',
            visible: false,
            svisible:true,
            schema: null,//数组格式，form表单里的数据
            rules: null,//表单验证
            form: null,
            api: null,//  是个对象，{update：form里有id的时候调update，save：form里没有id的时候调save}
            beforeSubmit: null,//可以是个函数，处理最终传给后台的数据
			alert:null//alert控制alert的显示，alert必须是个对象，alert里的title显示具体的内容，alert也必须传type
		}
	},
    props:{
        // type:''
    },
    computed:{
        ...mapGetters(['Model']),
        currentModel(){
            if(this.type){
                return eval('this.Model.'+this.type);
            }
            return ''
        },
    },
    created(){
        if(this.currentModel){
            this.init()
        }
    },
    methods:{
        handleClose(){
            this.visible = false
            this.form = null;
            this.doClose();
        },
        close(){

        },
        init(){
            if(this.currentModel){
                this.schema = this.currentModel.schema;
                this.rules = this.currentModel.rules;
                this.api=this.currentModel.api
            }
        },
        onSubmit(data){
            this.submit && this.submit(data)
            this.handleClose();
        }
    }
}
</script>
<style lang="scss" scoped>
.form-alert{
	margin: 0 10px;
}
</style>