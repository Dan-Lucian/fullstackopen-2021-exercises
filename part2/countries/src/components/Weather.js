import { useEffect, useState } from 'react';
import axios from 'axios';

const CapitalWeather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${encodeURIComponent(
          capital[0]
        )}`
      )
      .then((res) => {
        console.log('weather server response \n', res.data);
        setWeather(res.data);
      });
  }, [capital]);

  if (!weather) return <p>Loading...</p>;

  if (!weather.success) {
    return (
      <>
        <p>there was an error when loading the weather data</p>
        <p>check the console</p>
      </>
    );
  }

  return (
    <>
      <p>
        <b>temperature: </b>
        {weather.current.temperature} Celsius
      </p>
      <img src={weather.current.weather_icons[0]} alt="weather" />
      <p>
        <b>wind: </b>
        {weather.current.wind_speed} mph direction{weather.current.wind_dir}
      </p>
    </>
  );
};

export default CapitalWeather;
