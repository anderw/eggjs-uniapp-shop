module.exports = app => {
    const { STRING, INTEGER,TEXT } = app.Sequelize;
  
    const GoodCategory = app.model.define('good_category', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: STRING, allowNull: false }, // 名称
        description: { type: TEXT }, // 商品描述
        imageId: INTEGER, // 分类图标
        parentId: { type: INTEGER}, // 上级Id
        mechantId: INTEGER, // 关联商家id
        status: { type: INTEGER, defaultValue: 1 }, //  状态：  1:可用 2：禁用
    },{freezeTableName: true});
    // 表关联的字段
    GoodCategory.associate = function() {
        GoodCategory.belongsTo(app.model.GoodCategory, { foreignKey: 'parentId', targetKey: 'id', as: 'parent'});
        GoodCategory.belongsTo(app.model.SystemFile, { foreignKey: 'imageId', targetKey: 'id', as: 'image'});
    }
    return GoodCategory;
};