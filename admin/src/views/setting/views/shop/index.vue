<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <!-- <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button> -->
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">
                店铺设置
            </div>
        </el-header>
        <el-main class="center-main" v-loading="loading">
            <el-form ref="form" :model="form" :rules="rules" label-width="140px">
                <el-form-item label="店铺名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="description">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="appId">
                    <el-input v-model="form.appId"></el-input>
                </el-form-item>
                <el-form-item label="appSecret">
                    <el-input v-model="form.appSecret"></el-input>
                </el-form-item>
                <el-form-item label="mchId">
                    <el-input v-model="form.mchId"></el-input>
                </el-form-item>
                <el-form-item label="mchKey">
                    <el-input v-model="form.mchKey"></el-input>
                </el-form-item>
                <el-form-item label="LOGO">
                    <el-upload ref="upload" :action="baseUrl+'/api/file/upload'" :file-list="fileList" :limit="1" list-type="picture-card" :auto-upload="true" :on-success="onSuccess">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
<script>
// import systemApi from '@/views/system/api';
import FormDialog from '@/components/FormDialog';
import FileUploader from '@/components/FileUploader'
import { deepClone } from '@/utils'
import { mapGetters } from 'vuex'
export default {
    components: {  },
    data() {
        const user = this.$store.getters.user
        return {
            loading:false,
            form: {
                id:'',
                name: '',
                description:'',
                appId: '',
                appSecret:'',
                mchId:'',
                mchKey:'',
                logoId:''
            },
            fileList: [],
            rules:{
                name:[
                    {required: true, message:'请输入名称',trigger:'blur'}
                ],
            }
        }
    },
    computed: {
        ...mapGetters(['baseUrl','user'])
    },
    created() {
        for(let i in this.form){
            this.form[i] = this.user.merchant[i]
        }
        if(this.user.merchant.logo){
            this.fileList.push({
                id: this.user.merchant.logo.id,
                url: this.baseUrl + this.user.merchant.logo.url
            })
        }
    },
    methods: {
        handleRemove(file) {
            var fileList = this.$refs.upload.uploadFiles
            for(let i=0;i<fileList.length;i++){
                if(fileList[i].uid==file.uid){
                    fileList.splice(i,1);break;
                }
            }
        },
        onSuccess(response, file, fileList){
            this.form.logoId = response.result.id
            file.id = response.result.id
        },
        save(){
            this.$refs.form.validate(valid=>{
                if(!valid){
                    return
                }
                var postData = deepClone(this.form);
                this.loading=true
                this.$api.merchant.merchant.update(postData).then(()=>{
                    this.$message({type:'success',message:'保存成功',duration:2000});
                    this.$store.dispatch('GetUserInfo',true)
                }).finally(()=>{
                    this.loading=false
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>