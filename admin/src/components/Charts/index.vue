<template>
	<div class="chart" ref="chart"></div>
</template>
<script>
    /* 引入图表配色 */
    import chartColor from './chartColor';
export default{
    name:'Charts',
	components:{},
	props:{
		option:{
			type: Object,
			default: null
		},
		series:{
			type: Array,
			default(){return []}
		}
	},
	watch:{
		option(){
			this.initChart();
		},
	},
	data(){
		return {
			chart: null,
			loading: false,
			chartColorType:''
		}
	},
	mounted(){
		var t = this;
		let dom = this.$refs.chart;
        t.chart = echarts.init(dom);
        // t.chart.showLoading();
        t.initChart();

        // 监听 window 窗口变化，自适应图表
        window.addEventListener('resize', t.resizeChart);
	},
	methods:{
		/* 图表大小自适应 */
        resizeChart() { this.chart && this.chart.resize(); },
		/* 返回图表数据 */
        getChartData() {
            /* 模板 */
            let tem = {
                /* 背景透明 */
                background: 'rgba(0, 0, 0, 0)',

                /* 控制鼠标经过扇区的显示 */
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}：{c}',
                    extraCssText: 'width: auto !important;'
                },

                /* 控制色块说明 */
                legend: {
                    type: 'scroll',
                    orient: 'horizontal',
                    bottom: '3%',
                    data: []
                },

                /* 颜色渐变 */
                visualMap: {
                    show: false,
                    min: 1,
                    max: 500,
                    inRange: {
                        colorLightness: [0.4, 0.7]
                    }
                },

                /* 图表需要的数据 */
                series: this.series ||[]
            };
            if(!tem.series.length) return tem;
            let _arr = tem.series[0].data, index = 0,
                _chartColor = chartColor[this.chartColorType];
            for (let i = 0; i < _arr.length; i++) {
                let item = _arr[i];

                // 设置配色
                if (_chartColor) {
                    if (index >= _arr.length) { index = 0; }
                    _arr[i].itemStyle = { color: _chartColor[index] };
                    index++;
                }

                // legend data 显示
                tem.legend.data.push(item.name);
            }

            return tem;
        },

        /* 饼图渲染 */
        initChart() {
            let t = this, option = this.option || t.getChartData();
            // console.log('option chart',option)
            t.chart.setOption(option);
            // t.chart.hideLoading();
        }
	}
}
</script>
<style lang="scss" scoped>
.chart{
	width: 100%;
	height: 100%;
	position: relative;
	min-height: 100px;
}
</style>