<!--
 * @description     环状单层饼图
 *
 * @author          wangyang
 *
 * ************************************************************************
 *
 * @sample          示例传参
 * @param           1. （* 必传参数）chartData <array> 渲染饼图需要接收的数据   参考 chartData:[{value:310, name:'正常'}]		
 *                       如果需要改变 图标颜色就在data里传一个itemStyle:{color:'#43CF7C'}  参考 chartData:[{value:310, name:'正常',itemStyle:{color:'#43CF7C'} }]
 * @param           2. （选传）textStyle <Object> 悬浮文本颜色配置    参考： textStyle:{color:red}
 * @param           3. （选传）formatter <Boolean> 控制鼠标经过扇区的显示    true 就是显示百分比，false就是不显示百分比

-->
<template>
	<div class="chart-box" ref="chartPieRnglike"></div>
</template>

<script>
export default {
	/* 组件名 */
	component: 'PieRnglike',

	props: {
		chartData: {
			type: Array,
			default: () => {
				return [];
			}
		},
		// 悬浮文本颜色配置  不传就是默认色
		textStyle: {
			type: Object,
			default: {}
		},
		// 控制鼠标经过扇区的显示  true 就是显示百分比，false就是不显示百分比
		// 默认就是true
		percentage: {
			type: Boolean,
			default: true
		}
	},

	watch: {
		/* TODO 监听 chartData 值的改变 */
		chartData() {
			this.initChart();
		}
	},

	/* 初始化 */
	mounted() {
		let t = this;
		t.$nextTick(() => {
			let dom = this.$refs.chartPieRnglike;
			t.chart = t.echarts.init(dom);
			// t.chart.showLoading();
			t.initChart();

			// 监听 window 窗口变化，自适应图表
			window.addEventListener('resize', t.resizeChart);
		});
	},

	data() {
		return {};
	},

	methods: {
		/* 图表大小自适应 */
		resizeChart() {
			this.chart && this.chart.resize();
		},
		getChartData() {
			let tem = {
				/* 控制鼠标经过扇区的显示 */
				tooltip: {
					trigger: 'item',
					formatter: this.percentage ? '{b}：{c}（{d}%）' : '{b}：{c}',
					extraCssText: 'width: auto !important;'
				},
				// 悬浮色块
				legend: {
					type: 'scroll',  //滚动翻页
					orient: 'horizontal', //布局朝向
					bottom: '1%',
					textStyle: this.textStyle,
					data: []
				},

				series: [
					{
						// name:'pai',
						type: 'pie',
						radius: ['50%', '70%'], // 饼图半径
						center: ['50%', '49%'], // 饼图定位
						avoidLabelOverlap: false,
						hoverOffset: 2, // 鼠标经过时扇区的大小变化

						label: {
							normal: {
								//normal 是图形在默认状态下的样式
								show: false,
								position: 'center'
							},

							emphasis: {
								//高亮标签的样式
								show: true,
								textStyle: {
									fontSize: '14',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
						    normal: {
						        show: false
						    }
						},
						
						data: this.chartData || []
					}
				]
			};
			this.chartData.forEach(item => {
				tem.legend.data.push(item.name);
			});

			return tem;
		},

		/* 饼图渲染 */
		initChart() {
			let t = this,
				option = t.getChartData();
			t.chart.setOption(option);
		}
	}
};
</script>

<style lang="scss" scoped></style>
