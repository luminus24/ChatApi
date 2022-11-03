const router = require('express').Router()
const passport = require('passport')
const userServices = require('./user.services')
const adminValidate = require('../middlewares/role.middleware')

require('../middlewares/auth.middleware')(passport)

//? Rutas Raiz

router.get('/',
   passport.authenticate('jwt', {session: false}) ,
   userServices.getAllUsers
)

//? Ruta de informacion propia del usuario logeado
router.route('/me')
   .get(
      passport.authenticate('jwt', {session:false}),
      userServices.getMyUser
   )
   .patch(
      passport.authenticate(`jwt`, {session:false}),
      adminValidate,
      userServices.patchMyUser
   )
   .delete(
      passport.authenticate(`jwt`, {session:false}),
      adminValidate,
      userServices.deleteMyuser
   )

//? Rutas dinamicas por ID

router.route('/:id')
   .get(userServices.getUserByID)
   .patch(
         passport.authenticate(`jwt`, {session:false}),

         userServices.patchUser
      )
   .delete(
         passport.authenticate(`jwt`, {session:false}),
         userServices.deleteUser
      )

module.exports = router