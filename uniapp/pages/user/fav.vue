<template>
    <view>
    <view class="goods-list">
    	<view 
    		v-for="(item, index) in goodsList" :key="index"
    		class="goods-item"
    		@click="navToDetailPage(item.good)"
    	>
    		<view class="image-wrapper">
    			<image :src="item.good.thumbnailImage && (baseUrl + item.good.thumbnailImage.url) || '/static/errorImage.jpg'" mode="aspectFill"></image>
    		</view>
    		<text class="title clamp">{{item.good.name}}</text>
    		<view class="price-box">
    			<text class="price">{{item.good.salePrice}}</text>
    			<text>已售 {{item.good.sales}}</text>
    		</view>
    	</view>
        
    </view>
    <uni-load-more :status="loadingType"></uni-load-more>
    </view>
</template>

<script>
    import {mapState} from 'vuex'
   export default{
        data(){
           return {
               goodsList:[],
               loadingType: 'more'
           }
        },
        computed: {
        	...mapState(['hasLogin','user','baseUrl']),
            
        },
        onLoad(){
            this.loadData()
        },
        methods:{
           loadData(){
               this.loadingType = 'loading';
                this.$api.user.fav.list().then(res=>{
                    this.goodsList = res.result.rows;
                    if(this.goodsList){
                        this.loadingType = 'noMore';
                    }
                })
           },
           //详情
           navToDetailPage(item){
           	//测试数据没有写id，用title代替
           	let id = item.id;
           	uni.navigateTo({
           		url: `/pages/product/product?id=${id}`
           	})
           },
        }
   }
</script>

<style lang="scss">
    /* 商品列表 */
    .goods-list{
    	display:flex;
    	flex-wrap:wrap;
    	padding: 0 30upx;
    	background: #fff;
    	.goods-item{
    		display:flex;
    		flex-direction: column;
    		width: 48%;
    		padding-bottom: 40upx;
    		&:nth-child(2n+1){
    			margin-right: 4%;
    		}
    	}
    	.image-wrapper{
    		width: 100%;
    		height: 330upx;
    		border-radius: 3px;
    		overflow: hidden;
    		image{
    			width: 100%;
    			height: 100%;
    			opacity: 1;
    		}
    	}
    	.title{
    		font-size: $font-lg;
    		color: $font-color-dark;
    		line-height: 80upx;
    	}
    	.price-box{
    		display: flex;
    		align-items: center;
    		justify-content: space-between;
    		padding-right: 10upx;
    		font-size: 24upx;
    		color: $font-color-light;
    	}
    	.price{
    		font-size: $font-lg;
    		color: $uni-color-primary;
    		line-height: 1;
    		&:before{
    			content: '￥';
    			font-size: 26upx;
    		}
    	}
    }
</style>
