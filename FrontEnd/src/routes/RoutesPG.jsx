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
import LandingPage from "../pages/LandingPage";
import Groups from "../pages/Groups";

function RoutesPG() {
  const { isAuthenticated, user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Home />} />
      <Route path="/login" element={!isAuthenticated ? <LogIn /> : <Home />} />
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
        path="/groups"
        element={isAuthenticated ? <Groups /> : <LogIn />}
      ></Route>
      <Route
        path="/classes"
        element={isAuthenticated ? <Classes /> : <LogIn />}
      ></Route>
      <Route
        path="/availability/:user_id"
        element={
          isAuthenticated ? (
            user.user_type !== 3 ? (
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
