import { useState } from "react";
import AddProduct from "./Tabs/AddProducts";
import ProductTable from "./Tabs/ProductsTable";
import EditProduct from "./Tabs/EditProduct";

const tabs = [
  { id: "add", name: "➕ Agregar Producto" },
  { id: "list", name: "📦 Ver Productos" },
  { id: "edit", name: "✏️ Editar Producto" },
];

function Panel() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Panel de Administracion 🛠️
      </h1>
      <div className="flex space-x-4 justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div>{activeTab === "add" && <AddProduct />}</div>
      <div>{activeTab === "list" && <ProductTable />}</div>
      <div>{activeTab === "edit" && <EditProduct />}</div>
    </div>
  );
}

export default Panel;
