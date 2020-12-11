/**
 * @description     图表配色
 *
 * @author          qinjunqiang
 * @email           qinjunqiang@qq.com
 * @phone           130-4286-0526
 *
 * @dictionary
 * 1. vintage
 * 2. westeros
 * 3. macarons
 * 4.1 walden
 * 4.2 walden_2
 * 5. neutral
 * 6.1 wonderland
 * 6.2 wonderland_2
 * 7. chalk
 * 8. purple
 * 9. gradient_blue
 * 10. light
 * 11. TODO pie_db
 * */

let chartColor = {

    /* 淡色系1-暖灰色调 */
    vintage: [
        '#d77b7b', '#909d8a', '#d6aa82', '#6d6f73', '#609fa7',
        '#eea08d', '#777363', '#cb7d63'
    ],

    /* 淡色系2-冷灰色调 */
    westeros: [
        '#516a90', '#59c3e5', '#ecaed9', '#93b6e2', '#a4e6ef', '#cbb0e2'
    ],

    /* 淡色系3 */
    macarons: [
        '#b6a2dd', '#5ab1ee', '#feb880', '#d7797f', '#8c97b2', '#ead954',
        '#96b454', '#2dc6c8',
    ],

    /* 冷色系-蓝紫 */
    walden: [
        '#40b0e2', '#69e5c1', '#626b90', '#a0a7e5', '#c3eaad', '#95dde'
    ],

    /* 冷色系-蓝黑 */
    walden_2: [
        '#a2cee1', '#5ea5bf', '#1e5f7c', '#0d4761', '#323a36',
        '#c1c1c6', '3d7dce1'
    ],

    /* 中间色-紫蓝 */
    neutral: [
        '#eee69d', '#cc61b1', '#6b3d6f', '#195b7e', '#7dcfb9',
        '#bcf7f5', '#daddc8'
    ],

    /* 补色系1-蓝红 */
    wonderland: [
        '#4da296', '#20c2aa', '#79d8a5', '#cf6389', '#f48db1', '#f1b2c8'
    ],

    /* 补色系2-蓝红灰 */
    wonderland_2: [
        '#7fdadb', '#efe8cb', '#ec7070', '#d3cca2', '#267677',
        '#c8c8c8'
    ],

    /* 暖色系-红蓝黄 */
    chalk: [
        '#fb97ae', '#86f6cf', '#f6f395', '#72cbfe', '#f6c4a0', '#d4a4ea',
        '#d1f4a7', '#75f1f1', '#293340'
    ],

    /* 暖色系-紫粉蓝 */
    purple: [
        '#897ba7', '#df98c6', '#8ed2e7', '#71669d', '#cc70ae', '#7bb3cb'
    ],

    /* 明亮 */
    light: [
        '#7cb4eb', '#4c4c52', '#8eec7f', '#f6a25d', '#8085e7', '#f05c7f',
        '#e3ec56', '#2f9d9c', '#f35b5a', '#87d9d2', '#5ba5ee', '#656580'
    ],

    /**
     * @description         【深蓝】 ---> 过渡至 ---> 【浅蓝】
     * @desc                色系由 Carrol 提供
     * */
    gradient_blue: [
        '#264376', '#28467b', '#2a4981', '#2c4c86', '#2e4f8b',
        '#2f528f', '#315493', '#335798', '#34599c', '#365ca0',
        '#375ea4', '#3960a7', '#3a63ab', '#3c65ae', '#3d67b2',
        '#3e69b5', '#406bb9', '#416dbc', '#426fbf', '#4371c2',
        '#4975c5', '#5b7ec8', '#6685ca', '#708bcc', '#7b93ce',
        '#8399d0', '#8da0d3', '#93a5d5', '#9cabd7', '#a2b0d9',
        '#a7b5db', '#aebadd', '#b3bedf', '#bac4e2', '#bfc8e3'
    ],
    follow:[
        "#00baad","#ffc300","#ff8d1a","#43cf7c"
    ],

	/* TODO 双层饼图 */
	pie_db: [
        {
            explain: "蓝",
            color: "#83c4ce",
            clildColor: [
                "#9dd4dd", "#bbe6ed"
            ]
        },

		{
			explain: "绿",
			color: "#b9ce72",
			clildColor: [
				"#c4d784", "#d2e398"
			]
		},

        {
            explain: "橙",
            color: "#d6a781",
            clildColor: [
                "#e5bc9b", "#e9cbb4"
            ]
        },

		{
            explain: "灰",
			color: "#8f8f8f",
            clildColor: [
                "#acabab", "#c6c6c6"
            ]
		},

        {
            explain: "浅蓝",
            color: "#777ca0",
            clildColor: [
                "#9599b8", "#aaaecc"
            ]
        },

		{
			explain: "红",
			color: "#ff9685",
			clildColor: [
				"#ffa99b", "#ffc0b6"
			]
		},
		
		{
			explain: "紫",
			color: "#7f62c2",
			clildColor: [
				"#9378d3", "#a891dd", "#bdabe6"
			]
		},
		
		{
			explain: "深蓝",
			color: "#293c55",
			clildColor: [
				"#41556f", "#536986", "#758ba9", "#99a7bb", "#b0c2dc"
			]
		},

        {
            explain: "淡黄",
            color: "#f7e371",
            clildColor: [
                "#fae98e", "#f9eca2", "#faf1bc"
            ]
        }
	]
};

export default chartColor;
export { chartColor }