module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const Message = app.model.define('log_message', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        title: STRING, // 消息名
        content: STRING, //消息内容
        sender: { type: INTEGER, defaultValue: 1 }, //发送者，1 系统，2 其他
        receiver: INTEGER, // 接收消息的人，0：全部成员，其他 用户id
        status: { type: INTEGER, defaultValue: 1 },//1 未读 2 已读
    },{freezeTableName: true});
  
    return Message;
};