/*
* des  枚举类型(数据转换)
*
* author     hwx
* 
* */


/**
 * @description     FIXME qinjunqiang 优化调整
 *                  value 对应后台的参数（* 该字段的值不可随意修改）
 *                  title 仅仅是写给自己看或后期维护的人看（过一段时间后给自己或维护的人看能很快对应上）
 *                  displayName 最终的翻译后的字段
 * */
let _constMap = (() => {
    let obj = {
        UserStatus:[
            {value: 1,label:'可用'},
            {value: 2,label:'禁用'}
        ],
        UserSex:[
            {value: 1,label:'男'},
            {value: 2,label:'女'}
        ],
        UserType:[
            {value: 1,label:'管理员'},
            {value: 2,label:'商家'},
            {value: 3,label:'用户'},
        ],
        // ordered: '待付款', inpayment: '付款中', paid: '已付款，待发货', receiving: '已发货，待收货', completed: '已完成', canceled: '已取消',closed:已关闭
        OrderStatus:[
            {value: "ordered",label: '待付款'},
            {value: "inpayment",label: '付款中'},
            {value: "paid",label: '待发货'},
            {value: "receiving",label: '待收货'},
            {value: "completed",label: '已完成'},
            {value: "canceled",label: '已取消'},
            {value: "closed",label: '已关闭'},
        ]
	};
	
    for (let key in obj) {
        let item = obj[key];

        for (let i = 0; i < item.length; i++) {
            let cItem = item[i];
            let k = item[i].langKey?item[i].langKey:'common';

            // 给每一个数组对象新增一个翻译 lang 参数
            //!cItem['displayName'] && (cItem['displayName'] = i18n.t(k + '.' + cItem.lang));
        }
    }

    return obj;
})();

export const constantMap = _constMap;