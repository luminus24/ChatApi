//? Routas de autenticacion y autorizacion

//* Login
//* Register
//* Recovery y Password
//* Verify User

const router = require('express').Router()
const authServices = require('./auth.services')
const {registerUser} = require('../users/user.services')

//? /api/v1/auth

router.post('/register', registerUser)

router.post('/login', authServices.login)

module.exports = router