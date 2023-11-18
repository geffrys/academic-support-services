import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

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
    <section>
      <h1>HOME</h1>
      <Toaster />
    </section>
  );
}

export default Home;