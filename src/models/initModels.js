const Users = require('./user.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')

const initModels = () =>{
   Users.hasMany(Conversations) //? Un usuario tiene muchas conversaciones
   Conversations.belongsTo(Users)

   Users.hasMany(Participants) //? Un usuario puede participar en muchas conversaciones
   Participants.belongsTo(Users)

   Users.hasMany(Messages) //? Un usuario tiene muchos mensajes
   Messages.belongsTo(Users) //? Un mensaje tiene un usuario

   Conversations.hasMany(Participants) //? Una conversacion tiene muchos participantes
   Participants.belongsTo(Conversations) //? Una cantidad de partivipantes tienen una conversacion

   Conversations.hasMany(Messages) //? Una conversacion tiene muchos mensajes
   Messages.belongsTo(Conversations) //? Un mensage esta en una sola conversacion
}

module.exports = initModels