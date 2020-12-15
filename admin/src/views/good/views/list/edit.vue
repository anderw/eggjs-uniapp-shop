<template>
    <el-container direction="vertical">
        <el-header class="sub-header-bar" height="40px">
            <!-- 右侧 刷新按钮 -->
            <!-- <el-button type="text" class="btn-refresh" icon="el-icon-refresh" @click="refresh">刷新</el-button> -->
            <!-- 左侧 页面模块标题 -->
            <div class="sub-header-title">
                <el-button type="text" icon="el-icon-back" @click="$router.back()"></el-button>
                商品添加
            </div>
        </el-header>
        <el-main class="center-main" v-loading="loading">
            <el-form ref="form" :model="form" :rules="rules" label-width="140px">
                <el-form-item label="商品分类" prop="categoryId">
                    <el-cascader v-model="form.categoryId" :options="categoryList" :props="categoryProps"></el-cascader>
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input v-model="form.description" type="textarea" rows="5"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload ref="upload" :action="baseUrl+'/api/file/upload'" :file-list="fileList" list-type="picture-card" :auto-upload="true" :on-success="onSuccess">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <span v-if="file.isDefault" class="image-default-tag">主图</span>
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" title="设为主图" @click="handleSetDefault(file)">
                                    <i class="el-icon-setting"></i>
                                </span>
                                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="规格">
                    <el-button @click="addSpec">添加规格</el-button>
                    <el-table :data="form.specs" border style="margin-top:10px">
                        <el-table-column label="规格名称">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="原价">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.marketPrice" controls-position="right" :precision="2"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column label="销售价">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.salePrice" controls-position="right" :precision="2"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column label="库存">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.stock" controls-position="right" :precision="0"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button @click="removeSpec(scope)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item label="商品介绍">
                    <el-input v-model="form.content" type="textarea" rows="5"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="1">上架</el-radio>
                        <el-radio :label="2">下架</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
<script>
import goodApi from '@/views/good/api';
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
                categoryId:'',
                status: 1,
                description:'',
                content:'',
                thumbnail:'',
                mechantId: user.merchant.id,
                specs:[]
            },
            categoryList: [],
            categoryProps: {
                value: 'id',
                label: 'name'
            },
            fileList: [],
            rules:{
                name:[
                    {required: true, message:'请输入商品名称',trigger:'blur'}
                ],
                categoryId:[
                    {required: true, message:'请选择商品分类',trigger:'blur'}
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['baseUrl','user'])
    },
    created() {
        this.getCategory();
        if(this.$route.query.id){
            this.getData()
        }
    },
    methods: {
        edit(data) {

        },
        getData(){
            const id = this.$route.query.id;
            goodApi.good.detail(id).then(res=>{
                this.form = res.result
                this.fileList = res.result.images.map(item=>{
                    item.url = this.baseUrl + item.url;
                    if(res.result.thumbnail==item.id){
                        item.isDefault = true
                    }
                    return item
                })
            })
        },
        submit(data) {
            this.refresh();
        },
        refresh() {
            this.$refs.table.refresh();
        },
        getCategory() {
            goodApi.category.tree().then(res => {
                this.categoryList = res.result;
            })
        },
        handleRemove(file) {
            console.log(file);
            var fileList = this.$refs.upload.uploadFiles
            for(let i=0;i<fileList.length;i++){
                if(fileList[i].uid==file.uid){
                    fileList.splice(i,1);break;
                }
            }
        },
        handleSetDefault(file){
            this.$refs.upload.uploadFiles.forEach(item=>{
                this.$set(file,'isDefault',false)
            })
            this.$set(file,'isDefault',true)
        },
        onSuccess(response, file, fileList){
            file.id = response.result.id
            if(fileList.length==1){
                this.$set(file,'isDefault',true)
            }
        },
        addSpec(){
            this.form.specs.push({name:'',salePrice:'',marketPrice:'',stock: 999})
        },
        removeSpec(scope){
            this.form.specs.splice(scope.$index,1);
        },
        save(){
            this.$refs.form.validate(valid=>{
                if(!valid){
                    return
                }
                var fileList = this.$refs.upload.uploadFiles
                if(!fileList.length){
                    return this.$message({type:'error',message:'请上传商品图片',duration:2000});
                }
                var postData = deepClone(this.form);
                postData.thumbnail = fileList.find(item=>item.isDefault).id;
                postData.images=fileList
                if(postData.categoryId instanceof Array){
                    postData.categoryId = postData.categoryId.pop()
                }
                this.loading=true
                goodApi.good.save(postData).then(()=>{
                    this.$message({type:'success',message:'保存成功',duration:2000});
                    this.$router.back();
                }).finally(()=>{
                    this.loading=false
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.image-default-tag{
    position:absolute;
    padding: 0 30px;
    background: #ff9600;
    color:#fff;
    font-size:12px;
    top: 0;
    left: -30px;
    transform: rotate(-45deg);
}
</style>