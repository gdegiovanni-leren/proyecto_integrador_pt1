import express from 'express'
import productsRouter from './routes/productsRouter.js'
import cartRouter from './routes/cartRouter.js'


import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartRouter)

app.get('/', (req, res) => {
res.status(404).send('<h1>RUTA NO ENCONTRADA, LAS RUTAS PERMITIDAS SON /api/products y api/cart</h1>')
})

app.listen(process.env.PORT, () => console.log(`Runinng on localhost: ${process.env.PORT} | Time : ${new Date().toLocaleString()}`))



process.on('uncaughtException', err => {
    console.log("procces uncaughtException")
    console.log(err)
})
