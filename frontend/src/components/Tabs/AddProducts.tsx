import { useState } from "react";
import supabase from "../../lib/supabase";

type ProductoForm = {
  nombre: string;
  precio: number;
  descripcion: string;
  categorias: string;
  imagen: File | null;
};

function AddProduct() {
  const [form, setForm] = useState<ProductoForm>({
    nombre: "",
    precio: 0,
    descripcion: "",
    categorias: "",
    imagen: null,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) : value,
    }));
    console.log(form);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, imagen: file }));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileName = `productos/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("imgs-storages")
      .upload(fileName, file);

    if (error) {
      console.error("Error al subir la imagen: ", error);
      return null;
    }
    return supabase.storage.from("imgs-storages").getPublicUrl(data.path).data
      .publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.imagen) {
      alert("Por favor, selecciona una imagen.");
      return;
    }
    setLoading(true);
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      alert("Debes iniciar sesión.");
      setLoading(false);
      return;
    }

    const imagenUrl = await uploadImage(form.imagen);
    if (!imagenUrl) {
      alert("Error al subir la imagen");
      setLoading(false);
      return;
    }
    const { error } = await supabase.from("Productos").insert([
      {
        nombre: form.nombre,
        precio: form.precio,
        descripcion: form.descripcion,
        categorias: form.categorias,
        imagenUrl,
        user_id: userData.user.id,
      },
    ]);
    if (error) {
      console.error("Error al crear producto:", error);
      alert("No se pudo crear el producto.");
    } else {
      alert("Producto agregado con éxito.");
      setForm({
        nombre: "",
        precio: 0,
        descripcion: "",
        categorias: "",
        imagen: null,
      });
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Panel de Administración
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Precio:
          </label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Descripción:
          </label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-500 min-h-[120px]"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Categorías:
          </label>
          <input
            type="text"
            name="categorias"
            value={form.categorias}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-gray-700 dark:text-gray-300">
            Imagen:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:border-blue-400 dark:hover:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
        >
          {loading ? "Agregando..." : "Agregar Producto"}
        </button>
      </form>
    </div>
  );
}
export default AddProduct;
