/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import axios from "axios";

const CountryWeatherInfo = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=e68a815f04f77180f1666f5b7859f628`
          )
          .then((response) => setWeatherData(response.data));
      } catch (error) {
        console.log("err fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [country]);

  return (
    <div className="country-data">
      <h2>Country: {country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Flag: {country.flag}</p>
      {weatherData && (
        <>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default CountryWeatherInfo;
