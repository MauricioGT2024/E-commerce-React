const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// GET → leer todos los productos
router.get('/', productosController.getProductos);


// GET → leer un producto por id
router.get('/:id', productosController.getProductoById);

// POST → crear un producto nuevo
router.post('/', upload.single("imagen"), productosController.create);

// PUT → actualizar un producto
router.put('/:id', upload.single("imagen"), productosController.update);


// DELETE → eliminar un producto
router.delete('/:id', productosController.remove);

module.exports = router;
