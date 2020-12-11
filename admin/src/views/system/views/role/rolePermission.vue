<template>
    <el-drawer title="角色权限" :visible.sync="dVisible"  :wrapperClosable="true" :before-close="handleClose" append-to-body @open="init">
        <div class="drawer-body" v-loading="loading">
            <div class="permission-list">
                <div class="item" v-for="item in list" :key="item.id">
                    <div class="title">
                        <el-checkbox v-model="item.checked" :indeterminate="item.checked && item.actions && !!item.actions.length && !item.actions.every(a=>a.checked)" >{{null}}</el-checkbox>
                        <span class="node-tit">{{ item.name }}</span>
                    </div>
                    <div class="det">
                        <el-checkbox v-model="action.checked" v-for="action in item.actions" :key="action.action">{{action.name}}</el-checkbox>
                    </div>
                </div>
            </div>
        <!-- <el-tree ref="tree" class="menu-tree" :props="props" :data="tree" highlight-current default-expand-all >
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <el-checkbox v-model="data.checked" :indeterminate="data.children && !!data.children.length && !node.childNodes.every(a=>a.data.checked)" :label="data.id">{{null}}</el-checkbox>
                <i class="node-icon" :class="[data.icon||'el-icon-folder']"></i>
                <span class="node-tit">{{ data.name }}</span>
            </div>
        </el-tree> -->
        </div>
        <div class="drawer-footer">
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-drawer>
</template>
<script>
import systemApi from '@/views/system/api';
import {deepClone} from '@/utils'
export default {
    props:['visible','data'],
    computed:{
        dVisible:{
            get(){
                return this.visible
            },
            set(val){
                this.$emit('update:visible',val)
            }
        }
    },
    data(){
        return{
            loading:false,
            props: {
                label: 'name',
                children: 'actions',
                isLeaf: 'leaf'
            },
            list: []
        }
    },
    created(){
    },
    methods:{
        init(){
            this.defaultChecked = [];
            this.getList();
        },
        handleClose(){
            this.$emit('update:visible',false)
        },
        getList(){
            this.loading=true;
            systemApi.role.authList(this.data.id).then(res => {
                this.list = res.result;
                this.findChecked()
            }).finally(()=>{
                this.loading=false;
            })
        },
        
        submit(){
            systemApi.role.authSave(this.data.id, this.list).then(()=>{
                this.$message({type:'success',message:'保存成功',duration:2000});
                this.handleClose();
            })
        }
    }
}
</script>
<style scoped lang="scss">
.permission-list{
    margin: 0 15px;
    .item{
        margin-bottom: 10px;
        .det{
            margin-left:25px;
        }
    }
}
</style>