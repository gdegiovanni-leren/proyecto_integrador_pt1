import fs from 'fs'
import ProductController from './productController.js'

class CartController {

    constructor(){
        this.filepath = './src/database/carts.json'
        this.format = 'utf-8'
        //si no existe archivo, lo creo vacio
        if(!fs.existsSync(this.filepath)){
            fs.writeFileSync(this.filepath, '')
        }
    }


    getNextID = (carts) => {
        const count = carts.length
        if(count == 0) return 1
        const lastCart = carts[count-1]
        return lastCart.id + 1
    }


    getCarts = async () => {

        if(!fs.existsSync(this.filepath)){
            console.log('ARCHIVO NO ENCONTRADO')
            return []
        }
        let carts = fs.readFileSync(this.filepath, this.format)

        if(carts.length <= 0 ) return []

        return JSON.parse(carts)
    }


    getCartById = async (id) => {

        if(!fs.existsSync(this.filepath)){
           return null
        }
        let carts = await this.getCarts()

        const cart = carts.find((cart) => cart.id == id)

        return cart ? cart : null
    }


    getProductsByCartId = async (cartId) => {

        if(!fs.existsSync(this.filepath)){
            return {status : false , message : 'ARCHIVO NO ENCONTRADO'}
        }

        let carts = await this.getCarts()

        const cart = carts.find((cart) => cart.id == cartId)

        return cart ?
        { status: true ,  products : cart.products , message : '' } :
        { status: false , products : null,  message : `No se ha encontrado carrito con el ID  ${cartId} solicitado`}

    }


    addCart =  async (data) => {

        if(!fs.existsSync(this.filepath)){
            return {status : false , message : 'ARCHIVO NO ENCONTRADO'}
        }

        try{
            //por defecto la lista de productos al crear el carrito va a ser vacia
            /*
            if(!data.products)  return {status: false, message : `No se pudo crear un nuevo carrito. Solicitud debe tener arreglo de productos` }
            const PC = new ProductController()
            let products = await PC.getProducts()
            await data.products.forEach( (element) => {
            let existProduct = products.some((product) => product.id == element.id)
            if(existProduct == false){
                console.log('false!')
                return {status: false, message : `No se pudo crear un nuevo carrito. El producto ${element.id} no fue encontrado` }
            }
            });
            */

            let carts = await this.getCarts()
            const id = await this.getNextID(carts)

            const cart = {
                id ,
                products: []
            }
            carts.push(cart)

            fs.writeFileSync(this.filepath, JSON.stringify(carts))

            return {status : true , message : 'Carrito creado con exito!'}

        }catch(e){
        console.log(e)
        return {status : false , message : 'Hubo un error en la creación del carrito'}
        }
    }

    addToCart = async(cartId,productId) => {

        if(!fs.existsSync(this.filepath)){
            return {status : false , message : 'ARCHIVO NO ENCONTRADO'}
        }

        try{
            //verifico si existe carrito con ese ID en la BD
            let cart = await this.getCartById(cartId)
            if(!cart) return { status : true , message : 'No se ha podido agregar producto al carrito. El id del carrito no existe.'}

            //verifico si existe producto con ese ID en la BD
            const PC = new ProductController()
            const product = await PC.getProductById(productId)
            if(product.status == false) return { status : false , message : 'No se ha podido agregar producto al carrito. El id del producto no existe o no se encuentra disponible'}

            //verifico si existe producto en el carrito:
            // si existe: aumento cantidad
            // si no existe: lo asocio

            //obtengo los index de carrito y producto para actualizar
            let carts = await this.getCarts()
            const index_cart = await carts.findIndex((cart) => cart.id == cartId)
            const index_product = await cart.products.findIndex((product) => product.id == productId)

            //console.log('INDEX CART',index_cart)
            //console.log('INDEX PRODUCT',index_product)

            if(index_product == undefined || index_product < 0){
                //el producto de momento, se agregará de 1 en 1
                carts[index_cart].products.push({id : parseInt(productId), quantity: 1})
                fs.writeFileSync(this.filepath, JSON.stringify(carts))
                return { status : true , message : 'El producto se ha agregado al carrito correctamente'}
            }else{
                carts[index_cart].products[index_product].quantity = carts[index_cart].products[index_product].quantity + 1
                fs.writeFileSync(this.filepath, JSON.stringify(carts))
                return { status : true , message : 'El producto se ha actualizado en el carrito correctamente'}
            }

        }catch(e){
            console.log(e)
            return { status : false , message : 'Hubo un error al intentar agregar producto al carrito'}
        }

    }

}

export default CartController