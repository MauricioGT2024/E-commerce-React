import { useState } from "react";
import supabase from "../lib/supabase";

function Panel() {
  const [nombre, setNombre] = useState<string>("");
  const [precio, setPrecio] = useState<number>(0);
  const [descripcion, setDescripcion] = useState<string>("");
  const [categorias, setCategorias] = useState<string>("");
  const [imagen, setImagen] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (!user || userError) {
      alert("Por favor, inicia sesión para agregar productos.");
      return;
    }

    if (!imagen) {
      alert("Por favor, selecciona una imagen.");
      return;
    }
    let imagenUrl = "";

    if (imagen) {
      const fileName = `productos/${Date.now()}_${imagen.name}`;
      const { data, error } = await supabase.storage
        .from("imgs-storages")
        .upload(fileName, imagen);

      if (error) {
        console.error("Error al subir la imagen:", error);
        return;
      }

      imagenUrl = `${
        supabase.storage.from("imgs-storages").getPublicUrl(data.path).data
          .publicUrl
      }`;
    }

    const { data, error } = await supabase
      .from("Productos")
      .insert([
        {
          nombre,
          precio,
          imagenUrl: imagenUrl,
          descripcion: descripcion,
          categorias: categorias,
        },
      ])
      .select();

    if (error) {
      console.error("Error al crear el producto:", error);
      return;
    }

    console.log("Producto creado:", data);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Panel de Administración</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-500 min-h-[120px]"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Categorías:</label>
          <input
            type="text"
            value={categorias}
            onChange={(e) => setCategorias(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">Imagen:</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImagen(file);
            }}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
}

export default Panel;
