module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const Merchant = app.model.define('merchant', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        appId: { type: STRING, unique: true, }, // 小程序appId
        appSecret: { type: STRING }, // 邮箱
        mchId: { type: STRING}, // 微信商户id
        mchKey: { type: STRING}, // 微信商户key
        name: STRING, // 商户名称
        userId: INTEGER, // 关联用户id
        status: { type: INTEGER, defaultValue: 1 }, //  状态：  1:启用 2：禁用
        address: STRING,//商户地址
        logoId: INTEGER
        // session_key: STRING, // 微信session_key
    },{freezeTableName: true});
    // 表关联的字段
    Merchant.associate = function() {
        Merchant.belongsTo(app.model.SystemFile, { foreignKey: 'logoId', targetKey: 'id', as: 'logo'});
    }
    return Merchant;
};