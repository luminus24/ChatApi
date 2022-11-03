const db = require('../utils/databases')
const {DataTypes} = require('sequelize')
const Users = require('./user.models')
const Conversations = require('./conversations.models')

const Messages = db.define('messages', {
   id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
   },
   userId:{ //? SenderID -- se cambio porque sino no da
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references:{
         key: 'id',
         model: Users
      }
   },
   conversationId:{
      type: DataTypes.UUID,
      allowNull: false,
      field: 'conversation_id',
      references:{
         key: 'id',
         model: Conversations
      }
   },
   message:{
      type: DataTypes.STRING(255),
      allowNull: false
   },
   createdAt:{
      type: DataTypes.DATE,
      defaultValue: Date.now(),
      field: 'created_at',
      allowNull: false
   },
   updatedAt:{
      type: DataTypes.DATE,
      defaultValue: Date.now(),
      field: 'updated_at',
      allowNull: false
   },
})

module.exports = Messages