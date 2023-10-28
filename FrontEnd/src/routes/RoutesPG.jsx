import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogIn from "../pages/LogIn";
import NotFound from "../components/NotFound";
import Recover from "../pages/Recover";
import Home from "../pages/Home";

function RoutesPG() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <LogIn /> : <Home />} />
      <Route path="*" element={isAuthenticated && <NotFound />} />
      <Route path="/recover" element={!isAuthenticated && <Recover />} />
      <Route
        path="/recover/:user_mail"
        element={!isAuthenticated && <Recover />}
      />
    </Routes>
  );
}

export default RoutesPG;
