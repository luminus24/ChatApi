const conversationsControllers = require('./conversations.controllers')

const getAllConversations = (req, res) =>{
   const createdBy = req.user.id
   conversationsControllers.getAllConversations(createdBy)
      .then(data =>{
         res.status(200).json(data)
      })
      .catch(err =>{
         res.status(400).json({message: err.message})
      })
}

const postConversation = (req, res) =>{
   const createdBy = req.user.id
   const {title, imageURL, createdAt, updatedAt} = req.body

   if(title && imageURL && createdBy){
      conversationsControllers.createConversation({title, imageURL, createdBy, createdAt, updatedAt})
         .then(data => {
            res.status(201).json(data)
         })
         .catch(err => {
            res.status(400).json({message: err.message})
         })
   }else{
      res.status(400).json({message: 'All fields mustbe completed', fields:{
         'title': 'string',
         'imageURL': 'string'
      }})
   }
}

const getConversationById = (req, res) =>{
   const id = req.params.id

   conversationsControllers.getConversationById(id)
      .then(data =>{
         if(data){
            res.status(200).json(data)
         }else{
            res.status(404).json({message: 'Invalid ID'})
         }
      })
      .catch(err =>{
         res.status(400).json({message: err.message})
      })
}

const patchConversation = (req, res) =>{
   const id = req.params.id
   const {title, imageURL} = req.body

   conversationsControllers.updateConversation(id, {title, imageURL})
      .then(data =>{
         if(data[0]){
            res.status(200).json({message: `Conversation with ID ${id}, edited succesfully!`})
         }else{
            res.status(400).json({message: 'Invalid ID'})
         }
      })
      .catch(err => {
         res.status(404).json({message: err.message})
      })
}

const deleteConversation = (req, res) =>{
   const id = req.params.id
   conversationsControllers.deleteConversation(id)
      .then(data =>{
         if(data){
            res.status(204).json()
         }else{
            res.status(400).json({message: 'Invalid ID'})
         }
      })
      .catch(err =>{
         res.status(400).json({message: err.message})
      })
}

module.exports = {
   getAllConversations,
   postConversation,
   getConversationById,
   patchConversation,
   deleteConversation
}