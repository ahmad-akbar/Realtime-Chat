'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMessages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatMessages.belongsTo(models.ChatRooms, {foreignKey: 'ChatRoomId', targetKey: 'id'})
      ChatMessages.belongsTo(models.User, {foreignKey: 'UserId', targetKey: 'id'})
    }
  };
  ChatMessages.init({
    ChatRoomId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChatMessages',
  });
  return ChatMessages;
};