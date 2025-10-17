import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setErrorMsg("Correo o contraseña incorrecta.");
      } else {
        setErrorMsg(error.message);
      }
    } else {
      alert("Inicio de sesión exitoso");
      navigate("/"); // o a la ruta que quieras
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Iniciar Sesión
      </h2>

      {errorMsg && (
        <p className="text-red-500 mb-4 text-center">{errorMsg}</p>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
      </div>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Cargando..." : "Iniciar Sesión"}
      </button>

      <Link to="/auth/register">
        <p className="text-center mt-4 hover:underline hover:text-blue-500">
          ¿No tenés una cuenta? Registrate
        </p>
      </Link>
    </div>
  );
}
