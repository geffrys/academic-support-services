import Footer from "./components/Footer";
import RoutesPG from "./routes/RoutesPG";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <main>
      <section className="content">
        {isAuthenticated && <Sidebar />}
        <section className="each_page">
          <RoutesPG />
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default App;
