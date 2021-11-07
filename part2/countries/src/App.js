import { useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Content from './components/Content';

const App = () => {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const handleCountryChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setCountry(inputValue);

    axios
      .get(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(inputValue)}`
      )
      .then((res) => {
        console.log('countries server response \n', res.data);
        setCountries(res.data);
        setFetchError(null);
      })
      .catch((err) => {
        // empty field triggers a fetch error
        if (inputValue.length !== 0) setFetchError(err);
        setCountries([]);
      });
  };

  const showSelectedCountry = (country) => {
    setCountries([country]);
  };

  return (
    <>
      <Form country={country} handleCountryChange={handleCountryChange} />

      <Content
        countries={countries}
        showSelectedCountry={showSelectedCountry}
        fetchError={fetchError}
      />
    </>
  );
};

export default App;
