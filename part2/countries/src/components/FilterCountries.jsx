/* eslint-disable react/prop-types */
import React from "react"; // Make sure to import React
import CountryWeatherInfo from "./CountryWeatherInfo";

const FilterCountries = ({ filteredCountries }) => {
  return (
    <div>
      {filteredCountries.length > 50 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <div className="country-data" key={filteredCountries[0].alpha3Code}>
          <h2>Country: {filteredCountries[0].name.common}</h2>
          <p>Area: {filteredCountries[0].area}</p>
          <p>Capital: {filteredCountries[0].flag}</p>
        </div>
      ) : (
        filteredCountries.map((country) => (
          <CountryWeatherInfo key={country.alpha3Code} country={country} />
        ))
      )}
    </div>
  );
};

export default FilterCountries;
