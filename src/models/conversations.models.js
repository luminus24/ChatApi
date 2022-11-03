const db = require('../utils/databases')
const {DataTypes} = require('sequelize')
const Users = require('./user.models')

const Conversations = db.define('conversations', {
   id:{
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
   },
   title:{
      type: DataTypes.STRING(30),
      allowNull: false
   },
   imageURL:{
      type: DataTypes.STRING,
   },
   createdBy:{
      type: DataTypes.UUID,
      allowNull: false,
      field: 'created_by',
      references:{
         key: 'id',
         model: Users
      }
   },
   createdAt:{
      type: DataTypes.DATE,
      defaultValue: Date.now(),
      field: 'created_at'
   },
   updatedAt:{
      type: DataTypes.DATE,
      defaultValue: Date.now(),
      field: 'updated_at'
   },
})

module.exports = Conversations