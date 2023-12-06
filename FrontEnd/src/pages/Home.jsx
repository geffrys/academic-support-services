import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import "../css/Home.css"

function Home() {
  const { user } = useAuth();
  useEffect(() => {
    toast.success("Welcome " + user.user_name, {
      style: {
        borderRadius: "10px",
        background: "var(--background-color-dark)",
        color: "var(--primary-color)",
      },
    });
  }, [user.user_name]);
  return (
    <section className="home">
      <Toaster />
      <h1 className="home__h1">Welcome to Academic Link</h1>
      <p className="home__p">Please enjoy your session!</p>
      <p className="home__p-s">Use the sidebar on the left to navigate through the page.</p>
    </section>
  );
}

export default Home;
