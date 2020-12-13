<template>
	<view>
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<text class="bg-upload-btn yticon icon-paizhao"></text>
			<view class="portrait-box">
				<image class="portrait" :src="user.avatar && (baseUrl + user.avatar.url)  || '/static/missing-face.png'"></image>
				<text class="pt-upload-btn yticon icon-paizhao"></text>
			</view>
		</view>
			<view class="history-section icon">
				<list-cell title="用户名" :tips="user.username" navigateType="null"></list-cell>
				<list-cell title="姓名" :tips="user.name" @eventClick="navTo('name')"></list-cell>
				<list-cell title="电话" :tips="user.phone||'无'" @eventClick="navTo('phone')"></list-cell>
				<list-cell title="邮箱" :tips="user.email||'无'" @eventClick="navTo('email')"></list-cell>
				<list-cell title="性别" :tips="user.sex==1?'男':'女'" @eventClick="navTo('sex')"></list-cell>
			</view>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import {  
	    mapState,  
	    mapMutations  
	} from 'vuex';  
	export default {
		components:{listCell},
		data() {
			return {
				
			};
		},
		computed:{
			...mapState(['user','baseUrl']),
		},
		methods:{
			navTo(type){
				var params = type+'='+this.user[type]
				console.log(params)
				uni.navigateTo({
					url:'/pages/userinfo/setting?'+params
				})  
			}, 
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
	}
	.user-section{
		display:flex;
		align-items:center;
		justify-content: center;
		height: 460upx;
		padding: 40upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
		.portrait-box{
			width: 200upx;
			height: 200upx;
			border:6upx solid #fff;
			border-radius: 50%;
			position:relative;
			z-index: 2;
		}
		.portrait{
			position: relative;
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
		.yticon{
			position:absolute;
			line-height: 1;
			z-index: 5;
			font-size: 48upx;
			color: #fff;
			padding: 4upx 6upx;
			border-radius: 6upx;
			background: rgba(0,0,0,.4);
		}
		.pt-upload-btn{
			right: 0;
			bottom: 10upx;
		}
		.bg-upload-btn{
			right: 20upx;
			bottom: 16upx;
		}
	}


</style>
