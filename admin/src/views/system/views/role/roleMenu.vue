<template>
    <el-drawer title="角色菜单授权" :visible.sync="dVisible"  :wrapperClosable="true" :before-close="handleClose" append-to-body @open="init">
        <div class="drawer-body" v-loading="loading">
        <el-tree ref="tree" class="menu-tree" :props="props" :data="tree" highlight-current default-expand-all >
            <div class="custom-tree-node" slot-scope="{ node, data }">
                <el-checkbox v-model="data.checked" :indeterminate="data.checked && data.children && !!data.children.length && !node.childNodes.every(a=>a.data.checked)" :label="data.id">{{null}}</el-checkbox>
                <i class="node-icon" :class="[data.icon||'el-icon-folder']"></i>
                <span class="node-tit">{{ data.name }}</span>
            </div>
        </el-tree>
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
                children: 'children',
                isLeaf: 'leaf'
            },
            sourceTree:[],
            tree: [],
            defaultChecked:[]
        }
    },
    created(){
        this.getAllMenu();
    },
    methods:{
        init(){
            this.defaultChecked = [];
            this.tree = deepClone(this.sourceTree)
            this.getList();
        },
        handleClose(){
            this.$emit('update:visible',false)
        },
        getAllMenu(){
            systemApi.menu.tree().then(res => {
                this.sourceTree = res.result
            })
        },
        getList(){
            this.loading=true;
            systemApi.role.menuList(this.data.id).then(res => {
                this.defaultChecked = res.result.map(a=>a.id)
                this.findChecked()
            }).finally(()=>{
                this.loading=false;
            })
        },
        findChecked(){
            var find=(menus)=>{
                for(let i=0;i<menus.length;i++){
                    if(this.defaultChecked.indexOf(menus[i].id)>-1){
                        this.$set(menus[i],'checked',true)
                    }
                    if(menus[i].children && menus[i].children.length){
                        find(menus[i].children)
                    }
                }
            }
            find(this.tree)
        },
        submit(){
            systemApi.role.menuSave(this.data.id, this.tree).then(()=>{
                this.$message({type:'success',message:'保存成功',duration:2000});
                this.handleClose();
            })
        }
    }
}
</script>
<style scoped lang="scss">
.custom-tree-node{
    .el-checkbox{
        margin-right:0;
    }
    .node-icon{
        margin-right: 10px;
    }
}
</style>