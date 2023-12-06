import Footer from "./components/Footer";
import RoutesPG from "./routes/RoutesPG";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthContext";
import WhatsappButton from "./components/WhatsappButton";

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
      <WhatsappButton />
      <Footer />
    </main>
  );
}

export default App;
