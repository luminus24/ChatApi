const messagesControllers = require('./messages.controllers')

const getAllMessages = (req, res) =>{
   messagesControllers.getAllMessages()
      .then(data =>{
         res.status(200).json(data)
      })
      .catch(err => {
         res.status(400).json({message: err.message})
      })
}

const postMessage = (req, res) =>{
   const userId = req.user.id
   const conversationId = req.params.id
   const {message} = req.body
   if(message && userId && conversationId){
      messagesControllers.createMessage({message, userId, conversationId})
         .then(data => {
            res.status(201).json(data)
         })
         .catch(err => {
            res.status(400).json({message: err.message})
         })
   }else{
      res.status(400).json({message: 'Missing data'})
   }
}

const getMessageById = (req, res) =>{
   const id = req.params.id
   messagesControllers.getMessageById(id)
      .then(data => {
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

const deleteMessage = (req, res) =>{
   const id = req.params.id
   messagesControllers.deleteMessage(id)
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
   getAllMessages,
   postMessage,
   getMessageById,
   deleteMessage
}