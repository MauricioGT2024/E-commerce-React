// # consultas SQL puras
// # prisma
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()


// sql server ⬇️

// async function getProductos() {
//   const pool = await conectar(); // siempre obtenés el pool
//   const result = await pool.request().query("SELECT * FROM Productos");
//   return result.recordset;
// }

// Prisma ⬇️

async function getProductos() {
  const productos = await prisma.productos.findMany()
  return productos
}

async function getProductoById(id) {
  const producto = await prisma.productos.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  return producto
}


async function searchProductos(nombre) {
  const productos = await prisma.productos.findMany({
    where: {
      nombre: {
        contains: nombre,
        mode: "insensitive"
      }
    }
  })
  return productos
}

async function addProduct(nombre, precio, imagenUrl, categorias, descripcion) {
  return await prisma.productos.create({
    data: {
      nombre,
      precio,
      imagenUrl,
      categorias,
      descripcion
    }
  })
}

async function updateProduct(id, data) {
  return prisma.productos.update({
    where: { id: Number(id) },
    data: {
      nombre: data.nombre,
      precio: data.precio,
      imagenUrl: data.imagenUrl ?? null, // importante aquí
      categorias: data.categorias,
      descripcion: data.descripcion,
    }
  })
}

async function deleteProduct(id) {
  await prisma.productos.delete({
    where: {
      id: parseInt(id)
    }
  })
}

module.exports = { getProductos, getProductoById, addProduct, updateProduct, searchProductos, deleteProduct }