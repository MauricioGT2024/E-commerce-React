// # lógica de negocio
const productService = require('../services/productosService')
async function getProductos(req, res, next) {
    try {
        const productos = await productService.getProductos()
        res.json(productos)
    } catch (err) {
        next(err);
    }
}

async function getProductoById(req, res, next) {
    try {
        const id = req.params.id;
        const producto = await productService.getProductoById(id)
        if (!producto) return res.status(404).json({ message: "Producto no encontrado" })
        res.json(producto)
    } catch (err) {
        next(err);
    }
}





async function create(req, res, next) {
    try {
        const { nombre, precio, imagenUrl, categorias, descripcion } = req.body

        if (!nombre || isNaN(Number(precio))) {
            return res.status(400).json({ message: 'Nombre y precio válido son requeridos' })
        }

        const producto = await productService.addProduct({
            nombre,
            precio: Number(precio),
            imagenUrl,
            categorias,
            descripcion,
        })

        res.status(201).json(producto)
    } catch (err) {
        next(err)
    }
}
async function update(req, res, next) {
  try {
    const id = req.params.id;
    const { nombre, precio, imagenUrl, categorias, descripcion } = req.body;

    const updateData = {
      nombre,
      precio: Number(precio),
      categorias,
      descripcion,
    };

    if (typeof imagenUrl !== 'undefined') {
      updateData.imagenUrl = imagenUrl;
    }

    const producto = await productService.updateProducto(id, updateData);

    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    res.status(200).json({ mensaje: "Producto editado exitosamente", producto });
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
    try {
        const id = req.params.id
        const producto = await productService.deleteProduct(id)
        res.json({ message: 'Producto eliminado', producto })
    } catch (err) {
        next(err)
    }
}

module.exports = { getProductos, getProductoById, create, update, remove }