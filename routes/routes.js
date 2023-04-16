import express from "express";
import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login

} from '../controller/users.js'

const routes = express.Router()
routes.get('/', (req, res) => {
    res.json('CMS')
})

// Users Routes 
routes.get('/users', getAllUsers)
routes.put('/updateuser/:id', updateUser)
routes.delete('/deleteuser/:id', deleteUser)

routes.post('/register', createUser)
routes.post('/login', login)


export default routes;

