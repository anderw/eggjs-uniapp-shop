module.exports = app => {
    const { STRING, INTEGER,TEXT } = app.Sequelize;
  
    const Good = app.model.define('good', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: STRING, allowNull: false }, // 商品名称
        description: { type: STRING }, // 商品描述
        content: { type: TEXT }, // 商品描述
        thumbnail: INTEGER, // 缩略图,关联图片id
        // salePrice: { type: DECIMAL}, // 售卖价
        // marketPrice: { type: DECIMAL}, // 市场价
        categoryId: INTEGER, // 关联商品分类
        mechantId: INTEGER, // 关联商家id
        status: { type: INTEGER, defaultValue: 1 }, //  状态：  1:上架 2：下架
    },{freezeTableName: true});
    // 表关联的字段
    Good.associate = function() {
        // 一对多
        app.model.Good.hasMany(app.model.GoodImage, { foreignKey: 'goodId', targetKey: 'id'});
        // 一对多
        app.model.Good.hasMany(app.model.GoodSpec, { foreignKey: 'goodId', targetKey: 'id'});
        // 一对一
        Good.belongsTo(app.model.GoodCategory, { foreignKey: 'categoryId', targetKey: 'id', as: 'category'});// 一对一
        Good.belongsTo(app.model.SystemFile, { foreignKey: 'thumbnail', targetKey: 'id', as: 'thumbnailImage'});
    }
    return Good;
};