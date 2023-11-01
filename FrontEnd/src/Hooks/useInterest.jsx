import { useEffect, useState } from "react";

function useInterest() {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    setInterests([
      "Music",
      "Sports",
      "Art",
      "Science",
      "Technology",
      "History",
      "Politics",
      "Literature",
      "Movies"
    ]);
  }, []);

  return interests;
}

export default useInterest;