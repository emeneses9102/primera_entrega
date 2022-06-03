import fs from 'fs'

export default class Api{
    constructor(rutaBD){
        this.rutaBD = __dirname + rutaBD
    }

    /* métodos para productos*/
    async findAll(){
        try{
            const todos= await fs.promises.readFile(this.rutaBD,'utf-8')
            return JSON.parse(todos)
        } catch(error){
            throw new Error(`Error: ${error}`)
        }
    }

    async findById(id){
        try {
            const todos = await this.findAll()
            const resultado= todos.find(e=>e.id==id)
            return resultado
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async create(obj){
        try {
            const todos = await this.findAll()
            let id
            todos.length===0 ? id=1 : id = todos[todos.length -1].id+1
            obj = {
                "id":id,
                "timestamp":Date.now(),
                "nombre": obj.nombre,
                "descripcion": obj.descripcion,
                "codigo": obj.codigo,
                "foto": obj.foto,
                "precio": obj.precio,
                "stock": obj.stock
            }
            todos.push(obj)

            await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
            return id
        } catch (error) {
            throw new Error(`Error al registrar un producto: ${error}`)
        }
    }

    async update(id,obj){
        try {
            const todos = await this.findAll()
            const posicion= todos.findIndex(e=>e.id==parseInt(id))
            
            obj = {
                "id":parseInt(id),
                "timestamp":obj.timestamp,
                "nombre": obj.nombre,
                "descripcion": obj.descripcion,
                "codigo": obj.codigo,
                "foto": obj.foto,
                "precio": obj.precio,
                "stock": obj.stock
            }

            todos.splice(posicion,1,obj)
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
            return parseInt(id)
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async delete(id){
        try {
            const todos = await this.findAll()
            const posicion= todos.findIndex(e=>e.id==parseInt(id))
            todos.splice(posicion,1)
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
            return "producto eliminado"
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    /* Métodos para el carrito */
    async createCart(){
        try {
            const todos = await this.findAll()
            let id
            todos.length===0 ? id=1 : id = todos[todos.length -1].id+1
            let obj = {
                "id":id,
                "timestamp":Date.now(),
                "productos": []
            }
            todos.push(obj)

            await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
            return id
        } catch (error) {
            throw new Error(`Error al registrar un producto: ${error}`)
        }
    }

    async delete(id){
        try {
            const todos = await this.findAll()
            const posicion= todos.findIndex(e=>e.id==parseInt(id))
            todos.splice(posicion,1)
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
            return "carrito eliminado"
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async ListProductsCartById(id){
        try {
            const todos = await this.findAll()
            const resultado= todos.find(e=>e.id==id)
            console.log(id)
            let lista= resultado.productos
            return lista
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async AddProductCart(id,obj){
        try {
            const todos = await this.findAll()
            const resultado= todos.find(e=>e.id==id)
            let prd = resultado.productos
            
            resultado.productos.length === 0 ? prd = [obj] : prd.push(obj)

            console.log("prod",prd)
            obj = {
                "id":parseInt(id),
                "timestamp":obj.timestamp,
                "productos":prd
            }

            todos.splice(resultado,1,obj)
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
            return "Producto agregado"
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async deleteById(idCarrito,idProducto){
        try {
            const todos = await this.findAll()
            const posicion= todos.find(e=>e.id==parseInt(idCarrito))
            let prd = posicion.productos

            console.log(prd)
            const posProd = prd.findIndex(e=>e.id==parseInt(idProducto))
            prd.splice(posProd,1)
            let obj = {
                "id":parseInt(idCarrito),
                "timestamp":posicion.timestamp,
                "productos":prd
            }
            todos.splice(posicion,1,obj)
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
            return "producto eliminado"
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

}