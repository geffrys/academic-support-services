import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogIn from "../pages/LogIn";
import NotFound from "../components/NotFound";
import Recover from "../pages/Recover";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Classes from "../pages/Classes";
import Availability from "../pages/Availability";
import Appintments from "../pages/Appointments";
import Team from "../pages/Team";

function RoutesPG() {
  const { isAuthenticated, user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <LogIn /> : <Home />} />
      <Route path="*" element={isAuthenticated && <NotFound />} />
      <Route path="/recover" element={!isAuthenticated && <Recover />} />
      <Route
        path="/recover/:user_mail"
        element={!isAuthenticated && <Recover />}
      />
      <Route path="/recover" element={!isAuthenticated && <Recover />}></Route>
      <Route
        path="/profile"
        element={isAuthenticated ? <Profile /> : <LogIn />}
      ></Route>
      <Route
        path="/appointments"
        element={isAuthenticated ? <Appintments /> : <LogIn />}
      ></Route>
      <Route
        path="/classes"
        element={isAuthenticated ? <Classes /> : <LogIn />}
      ></Route>
      <Route
        path="/availability"
        element={
          isAuthenticated ? (
            user.user_type === 2 ? (
              <Availability />
            ) : (
              <NotFound />
            )
          ) : (
            <LogIn />
          )
        }
      ></Route>
      <Route
        path="/team"
        element={
          isAuthenticated ? (
            user.user_type === 1 ? (
              <Team />
            ) : (
              <NotFound />
            )
          ) : (
            <LogIn />
          )
        }
      ></Route>
    </Routes>
  );
}

export default RoutesPG;
