<template>
	<view>
		<div class="form-row" v-for="item in list" :key="item.prop">
			<text class="label">{{titleMap[item.prop]}}:</text>
			<input v-if="['name','phone','email'].indexOf(item.prop)>-1" class="text" type="text" v-model="item.value"/>
            <picker class="text" @change="bindPickerChange" :value="item.value-1" :range="sexArray">
                <view class="uni-input">{{sexArray[item.value-1]}}</view>
            </picker>
		</div>
		<div class="form-row">
			<button class="btn" @click="save">确定</button>
		</div>
	</view>
</template>

<script>
    import { mapMutations } from 'vuex';
    
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
				},
                sexArray:['男','女']
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
            ...mapMutations(['login']),
            bindPickerChange: function(e) {
                console.log('picker发送选择改变，携带值为', e.target.value)
                var sexItem = this.list.find(a=>a.prop=='sex')
                sexItem.value = e.target.value+1
            },
			save(){
				for(const i in this.list){
					this.form[this.list[i].prop] = this.list[i].value
				}
				this.$api.user.update(this.form).then(()=>{
					this.$api.msg('更新成功');
                    this.$api.user.info().then(resp=>{
                    	this.login(resp.result);
                    	uni.navigateBack();  
                    })
					// setTimeout(()=>{
					// 	uni.navigateBack()
					// }, 800)
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
