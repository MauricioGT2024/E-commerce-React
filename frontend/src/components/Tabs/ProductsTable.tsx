import { useEffect, useState } from "react";
import type { Product } from "../../types/Product";
import { useProducts } from "../../hooks/useProducts";
import supabase from "../../lib/supabase";

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { products: fetchedProducts, loading, error } = useProducts();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  const extractStoragePath = (url: string) => {
    const parts = url.split("/storage/v1/object/public/imgs-storages/");
    return parts[1] || "";
  };

  const handleDelete = async (id: number, imagenUrl: string) => {
    if (deletingId !== null) return;
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirm) return;

    setDeletingId(id);
    try {
      // Eliminar la imagen del almacenamiento
      if (imagenUrl) {
        const imagePath = extractStoragePath(imagenUrl);
        const { error: storageError } = await supabase.storage
          .from("imgs-storages")
          .remove([imagePath]);
        if (storageError) {
          console.error("Error al eliminar la imagen:", storageError);
          alert("Hubo un error al eliminar la imagen del producto.");
          return;
        }
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    } finally {
      setDeletingId(null);
    }

    const { error: dbError } = await supabase
      .from("Productos")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("Error al eliminar el producto:", dbError);
      alert("Hubo un error al eliminar el producto.");
    } else {
      setProducts(products.filter((product) => product.id !== id));
    }

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;
  };

  return (
     <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="text-left px-4 py-2">Id</th>

            <th className="text-left px-4 py-2">Nombre</th>
            <th className="text-left px-4 py-2">Precio</th>
            <th className="text-left px-4 py-2">Categoría</th>
            <th className="text-left px-4 py-2">Imagen</th>
            <th className="text-left px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No hay productos.
              </td>
            </tr>
          )}
          {products.map((prod) => (
            <tr
              key={prod.id}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <td className="px-4 py-2">{prod.id}</td>
              <td className="px-4 py-2">{prod.nombre}</td>
              <td className="px-4 py-2">${prod.precio.toFixed(2)}</td>
              <td className="px-4 py-2">{prod.categorias}</td>
              <td className="px-4 py-2">
                <img
                  src={prod.imagenUrl || "https://via.placeholder.com/40"}
                  alt={prod.nombre}
                  className="w-10 h-10 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(prod.id, prod.imagenUrl)}
                  disabled={deletingId === prod.id}
                  className={`text-sm px-3 py-1 rounded font-medium text-white ${
                    deletingId === prod.id
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {deletingId === prod.id ? "Eliminando..." : "Eliminar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
