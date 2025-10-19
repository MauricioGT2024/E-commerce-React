import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import type { Product } from "../../types/Product";
import supabase from "../../lib/supabase";

const EditProduct = () => {
  const { products, loading, error } = useProducts();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData(p);
    setNewImage(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
    setNewImage(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    if (!editingId) return;

    const { data: user } = await supabase.auth.getUser();

    let imagenUrl = formData.imagenUrl;

    if (newImage) {
      const fileName = `productos/${Date.now()}_${newImage.name}`;
      const { error: uploadError } = await supabase.storage
        .from("imgs-storages")
        .upload(fileName, newImage);

      if (uploadError) {
        console.error("Error subiendo la imagen", uploadError);
        alert("Error al subir la nueva imagen");
        return;
      }

      const publicUrl = supabase.storage
        .from("imgs-storages")
        .getPublicUrl(fileName).data.publicUrl;

      imagenUrl = publicUrl;
    }

    const { error: updateError } = await supabase
      .from("Productos")
      .update({
        nombre: formData.nombre,
        precio: formData.precio,
        descripcion: formData.descripcion,
        categorias: formData.categorias,
        imagenUrl: imagenUrl, // ✅ esto debe ir
        user_id: user.user?.id,
      })
      .eq("id", editingId);
      window.locations.reload()
    if (updateError) {
      console.error(updateError);
      alert("Error al actualizar el producto");
    } else {
      alert("Producto actualizado correctamente");
      setEditingId(null);
      setFormData({});
      setNewImage(null);
    }
  };

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="w-full overflow-x-auto p-6">
      <table className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="p-4 border font-semibold">ID</th>
            <th className="p-4 border font-semibold">Nombre</th>
            <th className="p-4 border font-semibold">Precio</th>
            <th className="p-4 border font-semibold">Descripcion</th>
            <th className="p-4 border font-semibold">Categorias</th>
            <th className="p-3 border font-semibold">Imagen</th>
            <th className="p-4 border font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              key={p.id}
            >
              <td className="p-4">{p.id}</td>
              <td className="p-4">
                {editingId === p.id ? (
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  p.nombre
                )}
              </td>
              <td className="p-4">
                {editingId === p.id ? (
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  p.precio
                )}
              </td>
              <td className="p-4">
                {editingId === p.id ? (
                  <textarea
                    name="descripcion"
                    value={formData.descripcion || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  p.descripcion
                )}
              </td>
              <td className="p-4">
                {editingId === p.id ? (
                  <input
                    type="text"
                    name="categorias"
                    value={formData.categorias || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  p.categorias
                )}
              </td>

              <td className="p-3">
                {editingId === p.id ? (
                  <div className="flex flex-col gap-2">
                    <img
                      src={
                        newImage
                          ? URL.createObjectURL(newImage)
                          : formData.imagenUrl ||
                            "https://via.placeholder.com/100"
                      }
                      alt="preview"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setNewImage(file);
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={p.imagenUrl || "https://via.placeholder.com/100"}
                    alt="producto"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              </td>
              <td className="p-4">
                {editingId === p.id ? (
                  <div className="space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      onClick={handleSave}
                    >
                      Guardar
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      onClick={handleCancel}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={() => handleEdit(p)}
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditProduct;
