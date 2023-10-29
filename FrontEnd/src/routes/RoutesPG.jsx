import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogIn from "../pages/LogIn";
import NotFound from "../components/NotFound";
import Recover from "../pages/Recover";
import Profile from "../pages/Profile";

function RoutesPG() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={!isAuthenticated && <LogIn />} />
      <Route path="*" element={isAuthenticated && <NotFound />} />
      <Route path="/recover" element={!isAuthenticated && <Recover />}></Route>
      <Route path="/profile" element={isAuthenticated? <Profile/> : <LogIn />}></Route>
    </Routes>
  );
}

export default RoutesPG;
