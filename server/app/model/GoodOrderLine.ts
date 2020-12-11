module.exports = app => {
    const { STRING, INTEGER,DECIMAL } = app.Sequelize;
  
    const GoodOrderLine = app.model.define('good_order_line', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        goodId: INTEGER,
        goodName: STRING,
        salePrice: DECIMAL,
        marketPrice: DECIMAL,
        qty: INTEGER,
        amount: DECIMAL,
        orderId: INTEGER,
        goodPic: STRING,
        goodSpecId: INTEGER,
        goodSpecName: STRING,
        goodCategoryName: STRING,
        goodCategoryId: INTEGER,

    },{freezeTableName: true});
    // 表关联的字段
    GoodOrderLine.associate = function() {
        
    }
    return GoodOrderLine;
};