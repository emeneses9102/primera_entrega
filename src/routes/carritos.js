import { Router } from "express";
import Api from '../apiClass'
const router = Router()
const api = new Api('/dataBase/carritos.json')

const isAdmin = false

//Crear el carrito
router.post('/', async(req, res)=> {
    const cart = await api.createCart()
    res.json(cart)
})
//Agregar productos al carrito
router.post('/:id/productos', async (req, res)=>{
    const {id} = req.params
    const obj = req.body
    const productos = await api.AddProductCart(id, obj)
    res.json(productos)
})
//Listar productos de un carrito por ID
router.get('/:id/productos', async (req, res)=>{
    const {id} = req.params
    const productosCart = await api.ListProductsCartById(id)
    res.json(productosCart)
})

//Eliminar carrito
router.delete('/:id', async(req, res)=> {
    const {id} = req.params
    const carrito = await api.delete(id)
    res.json(carrito)
})


//Eliminar producto del carrito por id de producto y carrito
router.delete('/:id/productos/:id_prod', async(req, res)=> {
    const {id, id_prod} = req.params
    const carrito = await api.deleteById(id,id_prod)
    res.json(carrito)
})

export default router