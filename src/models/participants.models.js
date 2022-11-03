const db = require('../utils/databases')
const {DataTypes} = require('sequelize')
const Conversations = require('./conversations.models')
const Users = require('./user.models')

const Participants = db.define('participants',{
   id:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull:false
   },
   conversationId: {
      type: DataTypes.UUID,
      field: 'conversation_id',
      allowNull: false,
      references:{
         key: "id",
         model: Conversations
      }
   },
   userId:{
      type: DataTypes.UUID,
      field: 'user_id',
      allowNull: false,
      references:{
         key: 'id',
         model: Users
      }
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

module.exports = Participants