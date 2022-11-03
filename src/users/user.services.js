const UsersControllers = require('./user.controllers')

const getAllUsers = (req, res) =>{
   UsersControllers.getAllUsers()
      .then(data => {
         res.status(200).json({data})
      })
      .catch(err =>{
         res.status(400).json({message: err.message})
      })
}

const getUserByID = (req, res) =>{
   const id = req.params.id
   UsersControllers.getUserByID(id)
      .then(data => {
         res.status(200).json({data})
      })
      .catch(err =>{
         res.status(404).json({message: err.message})
      })
}

const registerUser = (req, res) =>{
   const {firstName, lastName, email, password, phone, birthday, gender, country} = req.body

   if(firstName && lastName && email && password && phone && birthday){
      UsersControllers.createUser({firstName, lastName, email, password, phone, birthday, gender, country})
         .then(data =>{
            res.status(201).json(data)
         })
         .catch(err =>{
            res.status(400).json({message: err.message})
         })
   }else{
      //? Error cuando no mandan todos los datos necesarios para crear un usuario
      res.status(400).json({message : 'All fields must be completed' , fields:{
         firstName: 'string',
         lastName: ' string',
         email: 'example@example.com',
         password: 'string',
         phone: '+52123123123',
         birthday: 'YYYY/MM/DD'
      }})
   }
}

const patchUser = (req, res) =>{
   const id = req.params.id
   const {firstName, lastName, phone, gender, country } = req.body

   UsersControllers.updateUser(id , {firstName, lastName, phone, gender, country})
      .then(data =>{
         if(data[0]){
            res.status(200).json({message: `User with ID ${id} , edited succesfully!`})
         }else{
            res.status(400).json({message: 'Invalid ID'})
         }
      })
      .catch(err =>{
         res.status(404).json({message:err.message})
      })
}


const deleteUser = (req, res) =>{
   const id = req.params.id
   UsersControllers.deleteUser(id)
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

//? TODO crear rutas protegidas /me

const getMyUser = (req, res) =>{
   const id = req.user.id //? req.user contiene la infomacion del otken desencriptado
   UsersControllers.getUserByID(id)
      .then(data =>{
         res.status(200).json(data)
      })
      .catch(err =>{
         res.status(400).json({message: err.message})
      })
}

const patchMyUser = (req, res) =>{
   const id = req.user.id
   const {firstName, lastName, phone, birthday, gender, country} = req.body
   UsersControllers.updateUser(id, {firstName, lastName, phone, birthday, gender, country})
      .then(data =>{
         res.status(200).json({message: `Your user  was edited succesfully`})
      })
      .catch(err =>{
         res.status(400).json({message: err.message})
      })
}

//? Dos tipos de DELETE
//* 1. Por administrador
//* 2. Por mi mismo

const deleteMyuser = (req, res) =>{
   const id = req.user.id
   UsersControllers.updateUser(id, {status: 'inactive'})
      .then(data =>{
         res.status(200).json({message: `Your user  was deleted succesfully`})
      })
      .catch(err =>{
         res.status(400).json({message: err.message})
      })
}

module.exports = {
   getAllUsers,
   getUserByID,
   patchUser,
   registerUser,
   deleteUser,
   getMyUser,
   patchMyUser,
   deleteMyuser
}