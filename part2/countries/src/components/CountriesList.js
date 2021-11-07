const CountriesList = ({ countries, showSelectedCountry }) => {
  return countries.map((country) => (
    <p key={country.name.common}>
      {country.name.common}
      <button onClick={() => showSelectedCountry(country)}>show</button>
    </p>
  ));
};

export default CountriesList;
