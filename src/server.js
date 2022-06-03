import express from "express";
import morgan from "morgan";

import productosRoutes from './routes/productos'
import carritosRoutes from './routes/carritos'

const app = new express();

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/productos',productosRoutes)
app.use('/api/carritos',carritosRoutes)

//Servidor inicializao
const PORT = 8080
app.listen(PORT,(err)=>{
    if (err) console.log("Error in server setup")
    console.log(`Escuchando en el puerto ${PORT}`)
})