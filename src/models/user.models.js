const db = require('../utils/databases')

const {DataTypes} = require('sequelize')

const Users = db.define('users', {
   id:{
      type: DataTypes.UUID,
      primaryKey:true,
      allowNull:false
   },
   firstName: {
      type: DataTypes.STRING,
      allowNull:false,
      field:'first_name'
   },
   lastName: {
      type: DataTypes.STRING,
      allowNull:false,
      field: 'last_name'
   },
   email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
         isEmail: true,
      }
   },
   password:{
      type: DataTypes.STRING,
      allowNull: false
   },
   phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false
   },
   birthday: {
      type: DataTypes.DATEONLY,
      allowNull:false
   },
   gender: {
      type: DataTypes.STRING
   },
   role: {
      type: DataTypes.STRING,
      defaultValue: 'normal',
      allowNull:false
   },
   country: {
      type: DataTypes.STRING
   },
   status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
      allowNull:false
   },
   isVerified: {
      type: DataTypes.STRING,
      field: 'is_verified',
      defaultValue: false,
      allowNull:false
   }
})

module.exports = Users