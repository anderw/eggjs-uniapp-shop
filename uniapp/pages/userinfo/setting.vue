<template>
	<view>
		<div class="form-row" v-for="item in list" :key="item.prop">
			<text class="label">{{titleMap[item.prop]}}:</text>
			<input class="text" type="text" v-model="item.value"/>
		</div>
		<div class="form-row">
			<button class="btn" @click="save">确定</button>
		</div>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				form:{},
				list:[],
				titleMap: {
					'name':'姓名',
					'phone':'电话',
					'email':'邮箱',
					'sex':'性别',
				}
			}
		},
		onLoad(option){
			for(const i in option){
				this.list.push({prop: i, value: option[i]})
			}
			uni.setNavigationBarTitle({
				title:'修改个人资料'
			})
		},
		methods:{
			save(){
				console.log(this.list)
				for(const i in this.list){
					this.form[this.list[i].prop] = this.list[i].value
				}
				this.$api.user.update(this.form).then(()=>{
					this.$api.msg('更新成功')
					setTimeout(()=>{
						uni.navigateBack()
					}, 800)
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
	}
	.form-row{
		margin: 20rpx 30rpx 0;
		.label{
			font-size: 24rpx;
			color:#999;
			margin-bottom: 10rpx;
			display: block;
		}
		.text{
			border:1px solid #ddd;
			background-color: #fff;
			padding: 0 20rpx;
			line-height: 80rpx;
			height: 80rpx;
			border-radius: 3px;
		}
		.btn{
			background-color: $base-color;
			color: #fff;
			margin-top: 60rpx;
		}
	}
</style>
