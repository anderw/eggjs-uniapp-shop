module.exports = app => {
    const { STRING, INTEGER,BOOLEAN,DOUBLE } = app.Sequelize;
  
    const UserAddress = app.model.define('user_address', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        province: { type: STRING, allowNull: false }, // 省
        city: { type: STRING }, // 市
        district: { type: STRING,  }, // 区
        township: STRING, // 街道
        place:STRING, //详细地址
        linkMan: STRING,
        linkPhone: STRING,
        isDefault: BOOLEAN,
        longitude: DOUBLE, // 用户性别：1男性, 2女性, 0未知
        latitude: DOUBLE,
        userId: INTEGER,
        // session_key: STRING, // 微信session_key
    },{freezeTableName: true});
    
    // 表关联的字段
    UserAddress.associate = function() {
        // 一对一
        UserAddress.belongsTo(app.model.SystemUser, { foreignKey: 'userId', targetKey: 'id', as: 'user'});
    }
    return UserAddress;
};