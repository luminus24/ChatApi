//? Dependencies
const express = require('express')
const db = require('./utils/databases')

//? Files
const {port} = require('./config')
const userRouter = require('./users/user.routers')
const authRouter = require('./auth/auth.routers')
const conversationRouter = require('./conversations/conversations.routers')
const initModels = require('./models/initModels')

//? Initial configs
const app = express()
app.use(express.json())

db.authenticate()
   .then(() =>{
      console.log('DataBase Autenticate')
   })
   .catch(err =>{
      console.log(err);
   })

db.sync()
   .then(() =>{
      console.log('DataBase Synced')
   })
   .catch(err =>{console.log(err)})

initModels()

app.get('/' , (req, res) =>{
   res.status(200).json({
      message: 'OK!',
      users: `localhost:${port}/api/v1/users`
   })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/conversations', conversationRouter )

app.listen(port, ()=>{
   console.log(`Server started at port ${port}` );
})