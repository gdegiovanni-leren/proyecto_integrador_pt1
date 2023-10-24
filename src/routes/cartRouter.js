
import { Router } from 'express'
import CartController from '../controllers/cartController.js'

const router = Router()

router.get('/', (req,res) => {
    res.send('OK')
})

router.get('/:cid', async (req,res) => {

    const { cid } = req.params

    const CC = new CartController()

    const result = await CC.getProductsByCartId(cid)

    if(result.status == true) return res.status(200).send(result.products)

    res.status(404).send(result.message)
})


router.post('/', async (req,res) => {

    const data = req.body

    const CC = new CartController()

    const result = await CC.addCart(data)

    if(result.status == true) return res.status(200).send(result.message)

    res.status(404).send(result.message)
})

router.post('/:cid/product/:pid', async (req,res) => {

    const { cid, pid } = req.params

    const CC = new CartController()

    const result = await CC.addToCart(cid,pid)

    if(result.status == true) return res.status(200).send(result.message)

    res.status(404).send(result.message)

})


export default router