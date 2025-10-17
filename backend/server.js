const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const productosRouter = require('./src/routes/productosRoutes')
const path = require('path')


// Aumentar límite de tamaño para JSON y form-urlencoded (evita PayloadTooLargeError para bodies grandes)

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor OK' });
});

app.use('/productos', productosRouter);


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
