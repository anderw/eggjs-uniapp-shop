<!--
 * @description     文件上传
 *
 * @author          大侠
 * @create          2019-08-09 15:00
-->
<template>
    <div>

        <!--多文件上传-->

        <div v-if="!single" class="file-uploader" :class="[onlyShow?'only-show':'']">
            <el-upload :on-change="handleFileChange"
                       list-type="picture-card"
                       :accept="accept"
                       :multiple="multiple"
                       :file-list="fileInnerList"
                       :auto-upload="false"
                       ref='uploadfile'>
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">

                    <!--图片文件-->
                    <img class="el-upload-list__item-thumbnail" v-if="imageReg.test(file.name)" :src="file.url" :alt="file.name">

                    <!--非图片文件-->
                    <div class="el-upload-list__item-name" v-else :title="file.name">
                        <!--<div class="el-upload-list__item-name" :title="file.name">-->
                        <i  class="fa fa-file-zip-o"></i>
                        <br>
                        {{file.name}}
                    </div>

                    <span class="el-upload-list__item-actions">
                    <!--预览-->
                    <span v-if="preview"  class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)"><i class="el-icon-zoom-in"></i></span>

                        <!--下载-->
                    <span v-if="file.id && downLoad" class="el-upload-list__item-delete download" @click="handleDownload(file)"><i class="el-icon-download"></i></span>

                        <!--删除-->
                    <span v-if="remove"  class="el-upload-list__item-delete delete" @click="handleRemove(file)"><i class="el-icon-delete"></i></span>
                </span>

                    <el-progress v-if="file.loading" type="circle" :percentage="file.percent"></el-progress>
                </div>
            </el-upload>

            <!--预览弹出框-->
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>

        <!--单文件上传-->

        <div v-if="single" class="file-uploader-single">
            <div tabindex="0" class="el-upload--picture-card">
                <!--添加-->
                <i class="el-icon-plus file-uploader-icon" v-if="!(files.length >0)"></i>

                <!--下载、删除-->
                <span class="el-upload-list__item-actions" v-if="files.length>0">
                    <i class="el-icon-download" v-if="files[0].id" @click.stop="handleDownload(files[0])"></i>
                    <i class="el-icon-delete" @click.stop="handleRemove(files[0])"></i>
                </span>

                <!--图片文件-->
                <img style="width: 100%" v-if="files.length>0 && imageReg.test(files[0].name)" :src="files[0].url" :alt="files[0].name">
                <!--非图片文件-->
                <div class="file-main" v-if="(files.length>0 && !imageReg.test(files[0].name))">
                    <i class="fa fa-file-zip-o"></i>
                    <div class="title" :title="files[0].name">
                        {{files[0].name}}
                    </div>
                </div>
                <input id="FileUpload"  type="file" :multiple="false" name="file" class="el-upload_input" :accept="accept" @change="handleUploadChange($event)">
                <el-progress v-if="singleLoading.loading" type="circle" :percentage="singleLoading.percent"></el-progress>
            </div>
        </div>
    </div>
</template>
<script>
import {fileUpload,deleteUpload,downLoadFile} from '@/api/common/index';
import {deepClone} from "@/utils/index";
export default{
	name: 'file-uploader',
	props:{
        single:Boolean,
        accept: {
			type: String,
			default:'*'
		},

        limit: {//上传文件个数
			type: Number,
			default: 1
		},

        maxSize: {//上传文件大小
			type: Number,
			default: 50 * 1024 * 1024
		},

        files: {
			type: Array,
			default(){return []}
		},

		multiple:{
			type: Boolean,
			default: false
		},
        /*此处的自动上传为true表示会自动调用上传文件方法*/
        autoUpload:{
            type: Boolean,
            default: true
        },
        /*@update by tcy 仅仅展示文件列表，保留下载，不需要上传与删除*/
        onlyShow:{
            type: Boolean,
            default: false
        },

        remove:{//移除
            type: Boolean,
            default: true
        },
		downLoad:{//下载
		    type: Boolean,
		    default: true
		},


        preview:Boolean,//预览

        beforeRemove: Function,
	},
	data(){
	    
		return {
            urlPrefix: this.$store.getters.baseUrl,//下载前缀
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
			fileInnerList:[],
            loading:false,
            uploadPercent:0,
            imageFilter:"png|gif|jpg|bmp|jpeg",
            imageReg:'',
            eventTarget: null,
            singleLoading: {
                loading:false,
                percent: 0,
            },
		}
	},
    created(){

        this.imageReg = this.getTypeReg(this.imageFilter);
        let fileInnerList = this.files &&this.files.map(item=>{
            item['url'] = this.urlPrefix+item.url;
            return item;
        }) ||[];

        this.fileInnerList = deepClone(fileInnerList);

        if(this.single){
            this.addTitle();
        }
    },

    watch:{
        files:{
            deep:true,
            handler:function (val) {
                if(this.fileInnerList.length == 0){
                    let fileInnerList = val.map(item=>{
                        item['url'] = this.urlPrefix+item.url;
                        return item;
                    });
                    this.fileInnerList = deepClone(fileInnerList);
                }
            }
        }
    },

	methods:{
            //单个上传操作 原生
            handleUploadChange(event){
                let file = event.target.files[0];
                if(!file) return;              
                 
                if (file.size > this.maxSize) {
                    return this.$message.error(i18n.t('common.uploadFileTipsPre') + this.maxSize +"!");
                }                
                
                if(file){
                    if(this.autoUpload){//自动上传
                        let formData = new FormData();
                        formData.append('file',file);//file
                        this.upLoadFile(formData,file);
                    }else{//非自动上传
                        this.files.shift();
                        this.files.push(file);
                        this.$emit('update:files',this.files);
                        this.$emit('change',file);
                    }

                    this.eventTarget = event.target;
                }
            },

            //单文件上传手动加title
            addTitle(){
                this.$nextTick(()=>{
                    let _FileUpload = document.getElementById('FileUpload');
                    if(this.files[0] && this.files[0].name){
                        _FileUpload.title = this.files[0].name;
                    }

                });
            },


            getTypeReg(typeFilter){
                // filter = "png|gif|jpg|bmp|jpeg|xlsx|xls|doc|docx|pdf|xml|ppt|apk|dll";
                return eval("/\.(" + typeFilter + ")$/i");
            },

            //多上传文件操作
            handleFileChange(file, fileList){
                if(!fileList.length){
                    fileList = this.$refs['uploadfile'].uploadFiles
                }
                if(this.limit == 1 && fileList.length > 1){//限定上传个数limit为1
                    fileList.shift();
                }

                this.fileInnerList = fileList;//给到中间层的this.fileInnerList

                if (file.size > this.maxSize) {
                    let index = fileList.map(item=>item.uid).indexOf(file.uid);
                    fileList.splice(index,1);
                    return this.$message.error("上传文件大小不能超过" + this.maxSize +"!");
                }

                if(this.autoUpload){//自动上传
                    let formData = new FormData();
                    formData.append('file',file.raw);//file.raw
                    this.upLoadFile(formData,file,fileList);

                }else{//非自动上传
                    if(this.limit == 1){
                        this.files = fileList;
                    }else {
                        this.files.push(file);
                    }
                    this.$emit('update:files',this.files);
                    this.$emit('change',file);

                }
            },

            //移除文件操作
            handleRemove(file){
                if (!this.beforeRemove) {
                    this.doRemove(file);
                } else if (typeof this.beforeRemove === 'function') {
                    let before = this.beforeRemove(file);
                    if (before && before.then) {
                        before.then(()=>{
                            this.doRemove(file);
                        }).catch(()=>{});
                    } else if (before !== false) {
                        this.doRemove(file);
                    }
                }
            },


            //下载
            handleDownload(file) {
                if(file.id) {
                    window.open(file.url);
                }
            },

            //预览
            handlePictureCardPreview(file) {
                //this.dialogImageUrl = file.url;
                //this.dialogVisible = true;
            },

            //上传接口
            upLoadFile(formData,file,fileList){
                let self = this;
                file['loading'] = true;
                file['percent'] = 0;

                this.singleLoading['loading'] = true;
                this.singleLoading['percent'] = 0;
                let singleLoading = this.singleLoading;

                let progressCallback = (currFilePercent)=>{
                    currFilePercent = currFilePercent > 99?99:currFilePercent;//最大值99
                    self.$forceUpdate();//所以必须有callback
                };

                fileUpload(formData,file,progressCallback,singleLoading).then(res=>{
                    //成功进度条100%
                    if(this.single){
                        this.singleLoading['loading'] = false;
                        this.singleLoading['percent'] = 100;
                        progressCallback(this.singleLoading['percent']);
                    }else {
                        file['loading'] = false;
                        file['percent'] = 100;
                        progressCallback(file['percent']);
                    }

                    //删除时所需，给上id标记
                    file.id = res.result.id;
                    file.url = res.result.url;
                    //单个文件上传
                    if(this.single){
                        this.addTitle();
                        this.eventTarget = null;//情况
                        this.files.shift();
                        this.files.push(file);
                    }else {
                        if(this.limit == 1){
                            this.files = fileList;
                        }else {
                            this.files.push(file);
                        }
                    }

                    this.$emit('update:files',this.files);
                    this.$emit('change',file);

                }).catch(()=>{
                    file['loading'] = false;
                    this.$forceUpdate();
                });
            },

            //移除接口
            doRemove(file){
                if(this.single){
                    this.eventTarget = null;
                    this.files = [];
                }

                if(file.id){//自动上传必有id
                    let index = this.files.map(item=>item.id).indexOf(file.id);
                    let idx = this.fileInnerList.map(item=>item.id).indexOf(file.id);
                    deleteUpload({id:file.id}).then(res=>{
                        if(index >=0 ) {
                            this.files.splice(index,1);
                            this.$emit('clear',file);
                        }
                        if(idx >=0 ) { this.fileInnerList.splice(idx,1);}

                        this.$emit('update:files',this.files);
                        this.$message.success('删除成功 !')
                    });
                }else {//非自动上传还未发送接口
                    let index = this.files.map(item=>item.uid).indexOf(file.uid);
                    let idx = this.fileInnerList.map(item=>item.uid).indexOf(file.uid);
                    if(index >=0 ) { this.files.splice(index,1);}
                    if(idx >=0 ) { this.fileInnerList.splice(idx,1);}
                }
            },
	}
}

</script>
<style lang="scss" scoped>
    @import '@/assets/css/variables.scss';
    /*文件上传*/
    .file-uploader{

        /deep/.el-upload-list{
            /deep/.el-upload-list__item{
                &:hover {
                    /deep/.el-upload-list__item-actions{
                        opacity: 1;
                        .el-upload-list__item-delete{
                            display: inline;
                        }
                    }
                }

                /deep/.el-upload-list__item-actions{//操作
                    right: 6px;
                    color: #FF6500;
                    width: auto;height: auto;
                    background-color: transparent;
                    left: auto;
                    z-index: 1;
                }
            }
            /deep/.el-progress{//上传进度
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                transform: none;
                width: 100%;
                background-color: rgba(0,0,0,.5);
                opacity: 1;
                z-index: 10;
                /deep/.el-progress-circle{
                    margin: 0 auto;
                    padding-top: 10px;
                }
            }
        }

        /deep/.el-upload-list--picture-card /deep/.el-progress /deep/.el-progress__text{
            color: #ffffff;
        }
        &.only-show{
            /deep/{
                .el-upload{
                    display: none;
                }
                .el-upload-list__item-delete.delete{
                    display: none!important;
                }
            }
        }
    }

    /*文件上传*/
    .file-uploader-single{
        .el-upload--picture-card{
            position: relative;
            text-align: center;
            .el-upload_input{
                display: block;
                position: absolute;
                width: 100%;height: 100%;
                top: 0;left: 0;cursor: pointer;opacity: 0;
            }

            .file-main{
                text-align: center;
                >i{margin:42px 0 10px}
                line-height: 1;
                .title{
                    width: 110px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    margin: 0 auto;
                    text-align: center;
                    padding: 10px 0;
                }
            }

            /deep/.el-upload-list__item-actions{
                opacity: 0;
                position: absolute;
                line-height: normal;
                top:4px;right: 6px;
                background-color: transparent;
                z-index: 1;
                i{
                    font-size: 18px;
                    color: #FF6500;
                }
                .el-icon-download{
                    margin-right: 10px;
                }
            }
            .el-progress {
                position: absolute;
                top: 0;left: 0;bottom: 0;right: 0;
                transform: none;
                width: 100%;
                background-color: rgba(0,0,0,.5);
                opacity: 1;
                z-index: 100;
                /deep/.el-progress-circle{
                    margin: 0 auto;
                    padding-top: 10px;
                }
                /deep/.el-progress__text{
                    color: #ffffff;
                }
            }
        }
        &:hover{
            .el-upload--picture-card{
                .el-upload-list__item-actions{
                    opacity: 1;
                }
            }
        }
    }
</style>