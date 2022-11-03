const Messages = require('../models/messages.models')
const uuid = require('uuid')
const Users = require('../models/user.models')
const Conversations = require('../models/conversations.models')

const getAllMessages = async() =>{
   const data = await Messages.findAll({
      include:[
         {
            model: Users,
         as: 'user',
         attributes:['id', 'firstName', 'lastName']
         },
         {
            model : Conversations,
            as: 'conversation',
            attributes:['id', 'title', 'imageURL', 'createdBy']
         }
      ],
      attributes:{
         exclude:['userId', 'conversationId', 'createdAt', 'updatedAt']
      }
   })
   return data
}

const createMessage = async(data) =>{
   const newMessage = await Messages.create({
      id: uuid.v4(),
      userId: data.userId,
      conversationId: data.conversationId,
      message: data.message,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
   })
   return newMessage
}

const getMessageById = async(id) =>{
   const data = await Messages.findOne({
      where: {
         id
      }
   })
   return data
}

const deleteMessage = async(id) =>{
   const data = await Messages.destroy({
      where: {
         id
      }
   })
   return data
}


module.exports = {
   getAllMessages,
   createMessage,
   getMessageById, //? por id
   deleteMessage //? por id
}