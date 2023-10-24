
import { Router } from 'express'
import ProductController from '../controllers/productController.js'

const router = Router()


router.get('/', async (req, res) => {

    const PC = new ProductController()

    res.status(200).send(await PC.getProducts(req.query?.limit))
})



router.get('/:pid', async (req,res) => {

    const { pid } = req.params

    const PC = new ProductController()

    const result = await PC.getProductById(pid)

    if(result.status == true) return res.status(200).send(result.product)

    res.status(404).send(result.message)
})


router.put('/:pid', async (req,res) => {

    const { pid } = req.params
    const data = req.body

    console.log('call update product with id : '+pid+' and data : '+data)

    const PC = new ProductController()

    const result = await PC.updateProduct(pid,data)

    if(result.status == true) return res.status(200).send(result.message)

    res.status(404).send(result.message)
})


router.post('/', async (req,res) => {

    const data = req.body

    console.log('new request add product',data)

    const PC = new ProductController()

    const result = await PC.addProduct(data)

    if(result.status == true) return res.status(200).send(result.message)

    res.status(500).send(result.message)
})


router.delete('/:pid', async (req,res) => {

    const { pid } = req.params

    const PC = new ProductController()

    const result = await PC.deleteProduct(pid)

    if(result.status == true ) return res.status(200).send(result.message)

    res.status(404).send(result.message)
})



export default router