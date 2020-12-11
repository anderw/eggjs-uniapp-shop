<!--
 * @description     头部的菜单收起展开切换按钮
 *
 * @author          涂重阳
 * @email           779311998@qq.com
 * @phone           18707133663
 * @create          2019-03-25 11:00
-->

<template>
	<div class="aside-toggle" @click="toggleAside()" v-if="!sidebar.hidden" :title="sidebar.opened?'折叠':'展开'">
		<i class="el-icon-s-fold" v-if="sidebar.opened"></i><i class="el-icon-s-unfold" v-else></i>
	</div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'MenuToggle',
        computed: {
            ...mapGetters(['sidebar'])
        },
        methods: {
            toggleAside() {
                this.$store.dispatch('toggleSideBar');
                this.$emit('toggle');
            },
        }
    }
</script>

<style lang="scss" scoped>
	.aside-toggle {
        cursor: pointer;
        color:#ccc;
        text-align: center;
        background: rgba(0,0,0,.1);
	}
</style>
