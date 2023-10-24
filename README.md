
# Proyecto final primera parte

# levantar proyecto
1. npm install
2. npm run serve

### API

# producto
GET @ https://localhost:8080/api/products  '?limit=10'
GET @ https://localhost:8080/api/products/:pid
POST @ https://localhost:8080/api/products  -> accepted body : { title, description , code, price , status, stock ,category , thumbnails[] }
PUT @ https://localhost:8080/api/products/:pid -> accepted body : { code , ... }
DELETE @ https://localhost:8080/api/products/:pid

# carrito
GET @ https://localhost:8080/api/carts/:cid
POST @ https://localhost:8080/api/carts
POST @ https://localhost:8080/api/carts/:cid/products/:pid -> accepted body : {}



### EJEMPLOS CASOS DE PRUEBA

```
POST @ https://localhost:8080/api/products
{
   "title" : "Producto de prueba",
   "description": "Descripción de prueba",
   "code" : "ab2",
   "price" : 14.50,
   "status" : false,
   "stock" : 88,
   "category" : "Indumentaria",
   "thumbnails" : [{"img_src": "/public/addd9.jpg"},{ "img_src" : "/public/asd.jpg"}]
}

```

# Posibles resultados:
No se pudo agregar el producto. El codigo ingresado ya existe
'No se encontraron datos de producto
El producto debe tener un titulo
El producto debe tener una descripción
El producto debe tener un codigo
El producto debe tener un precio
El producto debe tener un status y debe ser true o false
El producto debe tener stock
El producto debe tener una categoría
El stock ingresado es incorrecto
El valor del precio es incorrecto
Thumbnails debe ser en formato array
Producto agregado con exito!
Hubo un error al intentar agregar producto al carrito


```
PUT @ https://localhost:8080/api/products/:pid
{
   "title" : "Producto de prueba",
   "description": "Descripción de prueba",
   "code" : "ab2",
   "price" : 14.50,
   "status" : false,
   "stock" : 88,
   "category" : "Indumentaria",
   "thumbnails" : [{"img_src": "/public/addd9.jpg"},{ "img_src" : "/public/asd.jpg"}]
}

```

# Posibles resultados:
No se encontraron productos para actualizar
No se pudo actualizar el producto. El codigo no fue ingresado correctamente o el codgo ya existe
No se encontró producto para actualizar con Id ${id}
El producto ${id} fue actualizado con exito!
Hubo un error en la actualización de producto


```
POST @ https://localhost:8080/api/carts/:cid/products/:pid
{ }

```

# Posibles resultados:
No se ha podido agregar producto al carrito. El id del carrito no existe
No se ha podido agregar producto al carrito. El id del producto no existe o no se encuentra disponible
El producto se ha agregado al carrito correctamente (cuando se crea)
El producto se ha actualizado en el carrito correctamente (cuando se encuentra y actualizo cantidad)
Hubo un error al intentar agregar producto al carrito
