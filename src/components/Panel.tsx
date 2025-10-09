import { useState } from "react";

function Panel() {
  const [nombre, setNombre] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoProducto = {
      nombre: nombre,
      precio: parseFloat(precio.toString()),
    };

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio.toString());
    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      const res = await fetch("http://localhost:3000/productos/", {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
      });
      const data = await res.json();
      console.log("Producto creado:", data);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    console.log(nuevoProducto);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Panel de Administración</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-1">
          <label className="font-semibold">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="font-semibold">Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="font-semibold">Imagen:</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImagen(file);
            }}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
}

export default Panel;
