module.exports = app => {
    const { STRING, INTEGER,ENUM,DECIMAL } = app.Sequelize;
  
    const GoodOrder = app.model.define('good_order', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        orderNo: { type: STRING, unique:true, allowNull: false }, // 商品名称
        // ordered: '待付款', inpayment: '付款中', paid: '已付款，待发货', receiving: '已发货，待收货', completed: '已完成', canceled: '已取消'
        status:  ENUM('ordered', 'inpayment', 'paid', 'receiving', 'completed', 'canceled'),
        addressId: INTEGER, // 地址Id
        address: STRING,//收货地址：省市区街道+详细
        linkMan: STRING,
        linkPhone: STRING,
        goodsTotalQty: DECIMAL,//商品总数量
        totalAmount:DECIMAL,
        merchantId: INTEGER,
        shopName: STRING,
        remark:STRING,//备注
        userName: STRING,
        userId: INTEGER,

    },{freezeTableName: true});
    // 表关联的字段
    GoodOrder.associate = function() {
        // 一对多
        app.model.Good.hasMany(app.model.GoodOrderLine, { foreignKey: 'orderId', targetKey: 'id'});
        GoodOrder.belongsTo(app.model.Merchant, { foreignKey: 'merchantId', targetKey: 'id', as: 'merchant'});// 一对一
        GoodOrder.belongsTo(app.model.SystemUser, { foreignKey: 'userId', targetKey: 'id', as: 'user'});
    }
    return GoodOrder;
};