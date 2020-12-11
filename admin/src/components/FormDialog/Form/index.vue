<template>
    <el-form class="form" ref="form" :model="form" :rules="rules" label-width="140px" @submit.native.prevent v-loading="loading">
        <template v-for="(item,index) in schema">
            <el-form-item :label="item.label" :key="index" :model="form" :prop="item.prop" :schema='schema' v-if="!isHidden(item)">
                <FormItem :form="form" :item="item"></FormItem>
            </el-form-item>
        </template>
        
        <el-form-item class="btn-area">
                <el-button @click="cancel">取消</el-button>
                <el-button class="btn-common" type="primary" @click="submit" native-type="submit">确定</el-button>
            </el-form-item>
    </el-form>
</template>

<script>
    import FormItem from './FormItem';
    import {deepClone} from '@/utils'
export default{
    components:{FormItem},
    data(){
        return {
            form:{},
            loading:false,
        }
    },
    props:{
        schema:{
            type: Array,
            default: []
        },
        rules:{
            type: Object,
            default: {}
        },
        api: {
            type: Object,
            default: {}
        },
        initData: '',
        beforeSubmit:'',
        submitValidate:''
    },
    created(){
        if(this.initData){
            this.form = deepClone(this.initData);
        }
        this.init();
    },
    methods:{
        init(){
            this.schema.forEach(item=>{
                if(!this.initData){
                    var value = typeof(item.default)!=='undefined'?item.default:'';
                    this.$set(this.form,item.prop,value)
                }

            })
        },
        validate(){
            let pass = false;
            this.$refs.form.validate(valid=>{
                pass = valid
            })

            return pass;
        },
        isHidden(data){
            if(!data.hidden){
                return false
            }
            
            if(data.hidden instanceof Function){
                return data.hidden(this.form)
            }
            if(typeof data.hidden !=='undefined'){
                return data.hidden
            }
        },
        submit(){
            if(!this.validate()) return;
            let postData = deepClone(this.form);
            
            var opt = {}
            this.schema.forEach(item=>{
                if(!item.readonly){
                    opt[item.prop] = postData[item.prop]
                }
            })
            opt.id=postData.id;
            postData = opt
                
            if(this.beforeSubmit && this.beforeSubmit instanceof Function){
                // beforeSubmit 是处理保存的数据
               postData = this.beforeSubmit(postData);
               if(!postData){
                   return
               }
            }
            this.loading=true;
            // postData 里有id 调update 没有调save
            if(postData.id){
                this.api.update(postData).then(res=>{
                    this.loading=false;
                    this.$message({type: 'success',message: '操作成功',duration:1500,showClose: true,});
                    this.$emit('submit',this.form)
                }).catch(()=>{
                    this.loading=false;
                })
            }else{
                this.api.save(postData).then(res=>{
                    this.loading=false;
                    this.$message({type:'success',message:'操作成功',duration:1500,showClose: true,});
                    this.$emit('submit',this.form)
                }).catch(()=>{
                    this.loading=false;
                })
            }
            
    
        },
        cancel(){
            this.$emit('cancel')
        }

    }
}
</script>
<style lang="scss" scoped>
.form{
    margin: 0 30px 0 0;
    padding-top: 20px;
}
</style>