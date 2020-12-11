<template>

	<div class="header-menu-item header-avatar" :class="{open:hoverActive}" @mouseenter="hoverActive=true" @mouseleave="hoverActive=false">
		<!-- title -->
		<a class="link" @click="routeTo('/system/log')">
			<i class="el-icon-message-solid  itme"></i>
			<span v-if='list.length > 0 ' class="lin-items"></span>
		</a>
		<div class="submenu">
			<div class="tit">消息中心</div>
			<div class="content">
				<!-- 未读消息的主体 -->
				<div v-if='list.length > 0'>
					<div class="cont-title" v-for="(k,index) in list" :key='index' @click="rouDeletls(k.id)">
						<div class="text-tit">
							<span class="dot"></span>
							<span class="name">{{event(k.eventName)}}</span>
						</div>
						
						<div class="texts">
							{{event(k.eventLog)}}
						</div>
						<div class="time">{{k.createTime | formatTime}}</div>
					</div>
				</div>
                     <!-- 如果没有未读的数据就显示这个 -->
				<div v-if='list.length <= 0' class="tet">没有未读消息</div>
			</div>
              <!-- 查看更多 -->
			<div class="foot" @click="routeTo('/system/log')">
				<el-button type="text" style="color: #CCCCCC;">查看更多<i class="el-icon-arrow-right"></i></el-button>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import {formatTime} from '@/utils'
	export default {
		name: 'MessageIco',
		data() {
			return {
				hoverActive: false,
				listQuery: {
					pageSize: 10,
					read: false
				},
				temes: '',
				list:[]
			}
		},
		computed: {
		},
		filters:{
			formatTime(val){
				return formatTime(val)
			}
		},
		created() {
			this.getList()
			// 30秒刷新一次
			this.temes = setInterval(() => {
				setTimeout(this.getList(), 0)
			}, 30 * 1000)

		},

		methods: {
			event(val){
				/* eslint-disable */
				try{
					var a = JSON.parse(val)
					val = this.$store.getters.language == 'en_US'?a.en:a.ch
				}catch(e){
					
				}
				return val
				/* eslint-enable */
			},
			// 查看更多
			routeTo(path) {
				this.hoverActive=false	
				this.$router.push(path);
			},
            // 点击消息本身跳转
			rouDeletls(id) {
				this.hoverActive=false	
				this.$router.push({
					path: '/system/log',
					// query:{
					// 	id:id
					// }
				});		
			},
               // 请求vuex里的actions的数据
			getList() {
				
			},
			
		},
		// 关闭定时器
		beforeDestroy() {
			clearInterval(this.temes)
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/assets/css/variables.scss';

	::-webkit-scrollbar-thumb {
		background: #666;
	}

	::-webkit-scrollbar-track-piece {
		background: rgba(0, 0, 0, 0)
	}

	.header-avatar {
		.link {
			max-width: 200px;
			text-overflow: ellipsis;
			white-space: nowrap;

			.itme {
				margin-right: 8px;
				margin-left: 8px;
			}

			.lin-items {
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50px;
				background: #DF6850;
				position: absolute;
				top: 16px;
				right: 12px;
			}


		}

		.submenu {
			width: 320px;
			// height: 300px;
			left: auto !important;
			right: 0;
			overflow: hidden !important;

			.tit {
				text-align: center;
				font-size: 12px;
			}

			.content {
				margin-top: -10px;
				margin-bottom: 40px;
				font-size: 12px;
				overflow: auto;
				max-height: 300px;
				line-height: 1.2;
                .cont-title:hover{
					background: #434343;
				}
				.cont-title {
					padding: 10px 15px;
					box-sizing: border-box;
					border-bottom: 1px solid #666666;

					.text-tit {
						margin-bottom: 10px;
						.dot {
							display: inline-block;
							width: 8px;
							height: 8px;
							border-radius: 50px;
							background: #DF6850;
						}
						.name{
							margin-left:10px;
							overflow: hidden;
							text-overflow: ellipsis;
							word-wrap: break-word;
						}
						&:after{
							content: "";
							display: block;
							clear: both;
						}
					}

					.texts {
						width: 100%;
						max-height: 85px;
						margin-bottom: 10px;
						word-break: keep-all;
					}
					.time{
						color: #999;
					}

				}

				.cont-title:hover {
					cursor: pointer;
				}

				.tet {
					text-align: center;
					color: #666666;
					padding: 15px 0;
				}

			}
		}

		.foot {
			width: 100%;
			font-size: 0;
			text-align: center;
			line-height: 1;
			background: #434343;
			position: fixed;
			bottom: 0;

		}

	}
</style>
