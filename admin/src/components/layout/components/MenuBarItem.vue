<template>
<div>
    <template v-for="menu in menus">
        <el-submenu :key="menu.id" v-if="menu.children && menu.children.length" :data-index="menu.url||menu.name" :index="menu.url||menu.name" :popper-append-to-body="addpendToBody" popper-class="manu-bar-submenu">
            <template slot="title">
                <i :class="menu.icon" v-if="menu.icon"></i>
                <i class="text-icon" v-if="!menu.icon">{{menu.name}}</i>
                <span :style="menu.name.length>length?'white-space:nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;max-width: 140px':'white-space:nowrap;'" :title="menu.name.length>length?menu.name:''" slot="title" :ref="'title-'+menu.id">{{menu.name}}</span>
            </template>
            <MenuBarItem :menus="menu.children"></MenuBarItem>
        </el-submenu>
        <el-menu-item :key="menu.id"  v-else :index="menu.url||menu.name" :data-index="menu.url||menu.name" :popper-append-to-body="addpendToBody" class="ripple">
            <router-link tag='div' :to="menu.url||''" class="tit-one">
                <i :class="menu.icon" v-if="menu.icon"></i>
                <i class="text-icon" v-else>{{menu.name}}</i>
                <span :style="menu.name.length>length?'white-space:nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;max-width: 155px':'white-space:nowrap;'" :title="menu.name.length>length?menu.name:''"  :ref="'title-'+menu.id" v-html="menu.name"></span>
            </router-link>
        </el-menu-item>
    </template>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
  export default {
    props: ['menus'],
    name: 'MenuBarItem',
	data(){
		return{
			type:'',
			length:this.$store.getters.language=='en_US'?20:10
		}
	},
    computed:{
        addpendToBody(){
            return this.$store.state.app.device=='mobile'?false:true;
        },
        ...mapGetters(['sidebar'])
    },
	methods:{
	}
  }
</script>