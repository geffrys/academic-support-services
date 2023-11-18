import { useState, useEffect } from "react";
import { getUserById } from "../api/users.api";

function useUser(id, depedency) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para manejar el estado de carga

  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await getUserById(id);
        setUser(await result.data);
        setLoading(false); // Cambia el estado de carga a false cuando la llamada se completa
      } catch (error) {
        console.error("Error", error);
        setLoading(false); // Asegúrate de cambiar el estado de carga incluso en caso de error
      }
    }

    fetchUser();
  }, [depedency]);

  if (loading) {
    // Si aún está cargando, puedes devolver un objeto de carga o null
    return { loading: true, user: null };
  }


  return user;
}

export default useUser;





