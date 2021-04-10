'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatRooms.hasMany(models.ChatMessages, {foreignKey: 'ChatRoomId', sourceKey: 'id'})
    }
  };
  ChatRooms.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChatRooms',
  });
  return ChatRooms;
};