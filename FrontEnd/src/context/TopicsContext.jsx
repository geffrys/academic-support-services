import { createContext, useContext, useEffect, useState } from "react";
import { getTopicsRequest } from "../api/topics.api";

export const TopicsContext = createContext();

export const useTopics = () => {
  const context = useContext(TopicsContext);
  if (!context) {
    throw new Error("useTopics must be used within a TopicsProvider");
  }
  return context;
};

export const TopicsProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);

  const getTopics = async () => {
    try {
      const res = await getTopicsRequest();
      setTopics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TopicsContext.Provider value={{ topics, getTopics }}>
      {children}
    </TopicsContext.Provider>
  );
};
