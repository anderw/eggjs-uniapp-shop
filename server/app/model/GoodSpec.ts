module.exports = app => {
    const { STRING, INTEGER,DECIMAL,TEXT } = app.Sequelize;
  
    const GoodSpec = app.model.define('good_spec', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: STRING, allowNull: false }, // 规格名称
        description: { type: TEXT }, // 商品描述
        pic: { type: STRING}, // 缩略图
        salePrice: { type: DECIMAL}, // 售卖价
        marketPrice: { type: DECIMAL}, // 市场价
        stock: INTEGER,  // 库存
        sales: {type: INTEGER, defaultValue: 0}, //销量
        goodId: INTEGER, // 关联商品id
        mechantId: INTEGER, // 关联商家id
    },{freezeTableName: true});
    
    return GoodSpec;
};