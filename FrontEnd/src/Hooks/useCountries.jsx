import { useState, useEffect } from "react";


function useCountries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        let countries = data.map((country) => {
          return {
            name: country.name.common,
            code: country.cca2,
            flag: country.flags.svg,
          };
        });
        let orderedCountries = countries.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        });

        setCountries(orderedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);
  return countries;
}

export default useCountries;