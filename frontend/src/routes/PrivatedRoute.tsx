// src/components/PrivateRoute.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../lib/supabase";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Verificando sesión...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
