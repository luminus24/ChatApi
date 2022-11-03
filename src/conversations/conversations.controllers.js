const Conversations = require('../models/conversations.models')
const uuid = require('uuid')

const getAllConversations = async(createdBy) =>{
   const data = await Conversations.findAll({
      where:{
         createdBy
      },
      attributes:{
         exclude: ['userId', 'createdBy', 'updatedAt', 'createdAt']
      }
   })
   return data
}

const createConversation = async(data) =>{
   const response = await Conversations.create({
      'id': uuid.v4(),
      'title':data.title,
      'imageURL': data.imageURL,
      'createdBy': data.createdBy,
      'createdAt': data.createdAt,
      'updatedAt': data.updatedAt
   })
   return response
}

const getConversationById = async(id) =>{
   const data = await Conversations.findOne({
      where:{
         id
      },
      attributes:{
         exclude:['createdAt', 'updatedAt', 'userId']
      }
   })
   return data
}

const updateConversation = async(id, data) =>{
   const result = await Conversations.update(data, {
      where: {
         id
      }
   })
   return result
}

const deleteConversation = async(id) =>{
   const data = await Conversations.destroy({
      where:{
         id
      }
   })
   return data
}


module.exports = {
   getAllConversations,
   createConversation,
   getConversationById, //? por id
   updateConversation, //? por id
   deleteConversation, //? por id

}