import { useState } from "react";
import supabase from "../../lib/supabase"; // Ajusta la ruta si tu archivo supabase está en otro lado
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validación básica
    if (!email || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes("User already registered")) {
        alert("Este correo ya está registrado. Intenta iniciar sesión.");
      } else {
        alert("Error al registrarse: " + error.message);
      }
      return;
    }

    if (data.user && !data.session) {
      alert("Registro exitoso. Te enviamos un correo para verificar tu cuenta.");
    } else {
      alert("Registro exitoso.");
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Contraseña:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>

      <button
        onClick={handleRegister}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      <Link to="/auth/login">
        <p className="text-center mt-4 hover:underline text-blue-600">
          ¿Ya tenés una cuenta? Iniciá sesión
        </p>
      </Link>
    </div>
  );
}
