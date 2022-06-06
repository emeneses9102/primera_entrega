import { Router } from "express";
import Api from '../apiClass'
const router = Router()
const api = new Api('/dataBase/productos.json')

const isAdmin = false

function adminOrClient(req, res, next){
    if (!isAdmin) {
        res.send("No tienes acceso a esta ruta")
    } else{
        next()
    }
}

router.get('/:id?', async (req, res)=>{
    const {id} = req.params
    const producto = await api.findById(id)
    res.json(producto)
})

router.post('/',adminOrClient, async(req, res)=> {
    const obj = req.body
    const producto = await api.create(obj)
    res.json(producto)
})

router.put('/:id',adminOrClient, async(req, res)=> {
    const {id} = req.params
    const obj = req.body
    const producto = await api.update(id, obj)
    res.json(producto)
})

router.delete('/:id',adminOrClient, async(req, res)=> {
    const {id} = req.params
    const producto = await api.delete(id)
    res.json(producto)
})


export default router