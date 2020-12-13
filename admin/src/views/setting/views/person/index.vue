<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <!-- <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button> -->
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">
                个人资料
            </div>
        </el-header>
        <el-main class="center-main" v-loading="loading">
            <el-form ref="form" :model="form" :rules="rules" label-width="140px">
                <el-form-item label="当前身份">
                    <span>{{user.type|constant('UserType')}}</span>
                </el-form-item>
                <el-form-item label="当前角色">
                    <span>{{user.role.name}}</span>
                </el-form-item>
                <el-form-item label="用户名">
                    <span>{{user.username}}</span>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="头像">
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
import systemApi from '@/views/system/api';
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
                name: '',
                email:'',
                sex: 1,
                avatarId:''
            },
            categoryList: [],
            categoryProps: {
                value: 'id',
                label: 'name'
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
            this.form[i] = this.user[i]
        }
        if(this.user.avatar){
            this.fileList.push({
                id: this.user.avatar.id,
                url: this.baseUrl + this.user.avatar.url
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
            this.form.avatarId = response.result.id
            file.id = response.result.id
        },
        save(){
            this.$refs.form.validate(valid=>{
                if(!valid){
                    return
                }
                var postData = deepClone(this.form);
                this.loading=true
                systemApi.user.update(postData).then(()=>{
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