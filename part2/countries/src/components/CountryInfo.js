import Weather from './Weather';

const CountryInfo = ({ countries }) => {
  const { name, capital, region, subregion, languages, population, flags } =
    countries[0];

  return (
    <article>
      <h1>{name.common}</h1>
      <p>capital {capital.toString()}</p>
      <p>population {population}</p>
      <p>region {region}</p>
      <p>subregion {subregion}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt={`flag of ${name.common}`} />
      <h2>Weather in {capital[0]}</h2>
      <Weather capital={capital[0]} />
    </article>
  );
};

export default CountryInfo;
