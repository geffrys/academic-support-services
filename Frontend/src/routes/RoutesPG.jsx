import LogIn from "../pages/LogIn";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";

function RoutesPG() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default RoutesPG;
