<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.linkMan" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.linkPhone" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{addressName}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">门牌号</text>
			<input class="input" type="text" v-model="addressData.place" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.isDefault" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					linkMan: '',
					linkPhone: '',
					province: '',
					city: '',
					district: '',
					place: '',
					isDefault: false
				},
				addressName: '在地图选择',
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				
				this.addressData = JSON.parse(option.data)
				this.addressName = this.addressData.province+this.addressData.city+this.addressData.district
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.isDefault = e.detail.value;
			},
			formatLocation(res) {
				var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
				var REGION_PROVINCE = [];
				var addressBean = {
					REGION_PROVINCE: null,
					REGION_COUNTRY: null,
					REGION_CITY: null,
					ADDRESS: null
				};
			
				function regexAddressBean(address, addressBean) {
					// regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
					regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
					var addxress = regex.exec(address);
					addressBean.REGION_CITY = addxress[1];
					addressBean.REGION_COUNTRY = addxress[2];
					addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
					// console.log(addxress);
				}
				if (!(REGION_PROVINCE = regex.exec(res.address))) {
					regex = /^(.*?(省|自治区))(.*?)$/;
					REGION_PROVINCE = regex.exec(res.address);
					addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
					regexAddressBean(REGION_PROVINCE[3], addressBean);
				} else {
					addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
					regexAddressBean(res.address, addressBean);
				}
				return addressBean
			},
			
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						const addressMap = this.formatLocation(data);console.log('address data',addressMap,data)
						this.addressName = addressMap.REGION_PROVINCE+addressMap.REGION_CITY+addressMap.REGION_COUNTRY;
						this.addressData.place = addressMap.ADDRESS;
						this.addressData.province = addressMap.REGION_PROVINCE;
						this.addressData.city = addressMap.REGION_CITY;
						this.addressData.district = addressMap.REGION_COUNTRY;
					}
				})
			},
			
			//提交
			confirm(){
				let data = this.addressData;
				if(!data.linkMan){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/\d{6,20}$/.test(data.linkPhone)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.province){
					this.$api.msg('请在地图选择所在位置');
					return;
				}
				if(!data.place){
					this.$api.msg('请填写门牌号信息');
					return;
				}
				
				this.$api.user.address.save(data).then(()=>{
					this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
					this.$api.prePage().refresh(data, this.manageType);
					setTimeout(()=>{
						uni.navigateBack()
					}, 800)
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
