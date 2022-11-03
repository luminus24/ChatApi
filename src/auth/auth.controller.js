const {getUserByEmail} = require('../users/user.controllers')
const {comparePassword} = require('../utils/crypto')

const loginUser = async(email, password) =>{
   try{
      const user = await getUserByEmail(email)
      //? user.password -- contiene la contraseña encriptada en la base de datos
      const verifyPassword = comparePassword(password, user.password)
      if(verifyPassword){
         return user
      }
      return false
   }catch{
      return false
   }
}

module.exports = {
   loginUser
}