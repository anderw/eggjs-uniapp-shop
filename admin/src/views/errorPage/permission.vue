<template>
    <div class="permission-container">
        <!-- <el-button @click="init">开始</el-button>
        <div id="test" style="height: 200px;"></div> -->
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="card-view">
                    <div class="card-view-header">
                        用户信息
                    </div>
                    <div class="card-view-body">
                        <table class="table" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td>id:</td><td>{{user.user.id}}</td>
                                </tr>
                                <tr>
                                    <td>姓名:</td><td>{{user.user.name}}</td>
                                </tr>
                                <tr>
                                    <td>tenantGroupId:</td><td>{{user.user.tenantGroupId}}</td>
                                </tr>
                                <tr>
                                    <td>tenantId:</td><td>{{user.user.tenantId}}</td>
                                </tr>
                                <tr>
                                    <td>type:</td><td>{{user.user.type}}</td>
                                </tr>
                                <tr>
                                    <td>userType:</td><td>{{user.user.userType}}</td>
                                </tr>
                                <tr>
                                    <td>username:</td><td>{{user.user.username}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
               
            </el-col>
            <el-col :span="12">
                <div class="card-view">
                    <div class="card-view-header">
                        用户角色信息
                    </div>
                    <div class="card-view-body">
                        <table class="table" cellpadding="0" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>名称</th><th>type</th><th>id</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,i) in user.roles" :key='i'>
                                    <td>{{item.name}}</td><td>{{item.type}}</td><td>{{item.id}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="card-view" style="margin-top: 20px;">
            <div class="card-view-header">
                用户权限信息
            </div>
            <div class="card-view-body">
                <ul class="permissions">
                    <li v-for="(item,index) in permissions" :key='index'>
                        <div class="title">{{item.id}}</div>
                        <div class="body">
                            <span v-for="(action,index) in item.actions" :key='index' style="margin-right: 5px;">{{action}}</span>
                        </div>
                        <!-- <el-tooltip popper-class="permissions-content" effect="dark" placement="right" tabindex="-1">
                            <span class="tit">{{item.id}}</span>
                            <div slot="content">
                                <span class="det"><span v-for="(action,index) in item.actions" :key='index' style="margin-right: 5px;">{{action}}</span></span>
                            </div>
                        </el-tooltip> -->
                        
                        
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script>
    export default{
        data() {
            return {
                permissions: []
            }
        },
        computed:{
            user(){
                return this.$store.getters.user
            }
        },
        created(){
            var currentUser = localStorage.getItem('currentUser');
            if(currentUser){
                currentUser = JSON.parse(currentUser);
                this.permissions = currentUser.permissions.sort((a,b)=>a.id.localeCompare(b.id));
            }

            
        },
        mounted(){
            // this.init();
        },
        methods:{
            init(){
                let component;
                eval(`component = {template:"<div><span>{{total}}</span><el-button @click='add'>增加</el-button></div>",data:function(){return {total: 2}},methods:{add:function(){this.total++}}}`)
               /* eslint-disable */
				const HelloWorld = Vue.extend(component)
				/* eslint-enable */
                // 创建 HelloWorld 实例，并挂载到一个元素上。
                new HelloWorld().$mount('#test')
            }
        }
    }
</script>
<style lang="scss" scoped>
.permission-container{
    padding: 40px;
}
.permissions{overflow: hidden;}
.permissions li{
    line-height: 30px;width:250px;float:left;list-style: none;
    // cursor: pointer;
    border:1px solid rgba(0,0,0,.5);
    margin: 0 10px 10px 0;
    &:hover{
        // background: rgba(255,255,255,.1);
    }
    .tit{
        display: block;
    }
    .title{
        padding: 5px 0;
        padding: 0 10px;
        background: rgba(0,0,0,.3);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .body{
        line-height: 20px;
        padding: 0 5px;
        margin-top: 10px;
        height: 80px;
        overflow: auto;
        span{
            margin: 0 0 5px 5px;
            display: inline-block;
            background: rgba(0,0,0,.1);
            padding: 0 5px;
            vertical-align: top;
        }
    }
}
.permissions-content .tit{
    max-width: 300px;display: block;
}
.permissions-content .det span{margin-right: 5px;}
.table{
    width: 100%;
}
</style>