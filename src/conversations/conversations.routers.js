const router = require('express').Router()
const conversationsServices = require('./conversations.services')
const messagesServices = require('../messages/messages.services')
const passport = require('passport')

router.route('/') //!RUTA PROTEGIDA
   .get(
      passport.authenticate('jwt', {session:false}),
      conversationsServices.getAllConversations
   ) //? Mostrar todas las conversaciones
   .post(
      passport.authenticate('jwt', {session:false}),
      conversationsServices.postConversation
   ) //? Crear conversaciones

router.route('/:id') //! Ruta protegida
   .get(
      passport.authenticate('jwt', {session:false}),
      conversationsServices.getConversationById
   ) //? mostrar una conversacion en especifico
   .patch(
      passport.authenticate('jwt', {session:false}),
      conversationsServices.patchConversation
   ) //? modificar la conversacion
   .delete(
      passport.authenticate('jwt', {session:false}),
      conversationsServices.deleteConversation
   ) //? eliminar la conversacion

   router.route('/:id/messages') //! Ruta Protegida
      .get(
         passport.authenticate('jwt', {session:false}),
         messagesServices.getAllMessages
      )
      .post(
         passport.authenticate('jwt', {session:false}),
         messagesServices.postMessage
      )

   router.route('/:id/messages/:id')
      .get(
         passport.authenticate('jwt', {session:false}),
         messagesServices.getMessageById
      )
      .delete(
         passport.authenticate('jwt', {session:false}),
         messagesServices.deleteMessage
      )

   module.exports = router