import express from "express";
import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login

} from '../controller/usersController.js'

import {
    getAllProducts,
    getProduct,
    createProduct,
    updataProduct,
    deleteProduct
} from '../controller/productController.js'

import { createOrder } from '../controller/ordersController.js'

const routes = express.Router()
routes.get('/', (req, res) => {
    res.json('CMS')
})

// Users Routes 
routes.get('/users/', getAllUsers)
routes.put('/updateuser/:id/authorizeUser', updateUser)
routes.delete('/deleteuser/:id/authorizeUser', deleteUser)

// Login & Register Routes
routes.post('/register', createUser)
routes.post('/login', login)

// Products Routs
routes.get('/products', getAllProducts)
routes.get('/product/:id', getProduct)
routes.post('/product', createProduct)
routes.put('/product/:id', updataProduct)
routes.delete('/product/:id', deleteProduct)

// Order Routes
routes.delete('/order', createOrder)
export default routes;

