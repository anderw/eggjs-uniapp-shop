module.exports = app => {
    const { INTEGER } = app.Sequelize;
  
    const GoodImage = app.model.define('good_image', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        fileId: INTEGER, // 图片id
        goodId: INTEGER, // 关联商品id
        mechantId: INTEGER, // 关联商家id
    },{freezeTableName: true});
    // 表关联的字段
    GoodImage.associate = function() {
        // 一对一
        GoodImage.belongsTo(app.model.SystemFile, { foreignKey: 'fileId', targetKey: 'id', as: 'file'});
    }
    return GoodImage;
};