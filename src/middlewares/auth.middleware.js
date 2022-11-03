//? Middleware para proteger rutas

const { jwtSecret } = require('../config')
const { getUserByID } = require('../users/user.controllers')

//* 1. Revisar si existe un token
//* 2. Verificar si el token pertenece a un usuario valido
//* 3. Modificar el req y agregar req.user con la informacion desencriptada del token

const JwtStrategy = require('passport-jwt').Strategy //? Passport maneja estrategias para las diferentes autenticaciones
const ExtractJwt = require('passport-jwt').ExtractJwt //? Extrae los headers de la peticion

module.exports = (passport) =>{
   const option = {
      jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme(`jwt`),
      secretOrKey: jwtSecret
   }

   passport.use(
      new JwtStrategy(option, async (decoded, done)=> {
         try {
            const response = await getUserByID(decoded.id)
            if(!response){
               return done(null, false)
            }
            console.log('decoded JWT', decoded);
            return done(null, decoded)
         } catch (error) {
            return done(error, false)
         }
      })
   )
}