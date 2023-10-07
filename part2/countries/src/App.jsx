import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import FilterCountries from "./components/FilterCountries";

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries: ", error);
      }
    };

    fetchCountries();
  }, []);

  const filterCountry = (e) => {
    setValue(e.target.value);
    const searchTerm = e.target.value.toLowerCase();

    const filteredItems = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(filteredItems);
  };

  return (
    <div>
      <h1>Countries</h1>

      <label htmlFor="country">
        Find Countries
        <input
          id="country"
          onChange={filterCountry}
          type="text"
          value={value}
        />
      </label>

      <FilterCountries filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
