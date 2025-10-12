import { useState } from "react";
import supabase from "../../lib/supabase";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleRegister = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      alert("Error al iniciar sesión: " + error.message);
    } else {
      alert("Inicio de sesión exitoso");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Registrarse
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Email:
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Contraseña:
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        onClick={handleRegister}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Registrarse"}
      </button>
    </div>
  );
}
