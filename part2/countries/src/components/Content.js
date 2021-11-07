import TooMany from './TooMany';
import CountriesList from './CountriesList';
import CountryInfo from './CountryInfo';
import Error from './Error';

const Content = ({ countries, showSelectedCountry, fetchError }) => {
  if (fetchError) return <Error error={fetchError} />;

  return (
    <section>
      {countries.length === 0 && 'Nothing searched for'}
      {countries.length > 10 && <TooMany />}
      {countries.length <= 10 && countries.length > 1 && (
        <CountriesList
          countries={countries}
          showSelectedCountry={showSelectedCountry}
        />
      )}
      {countries.length === 1 && <CountryInfo countries={countries} />}
    </section>
  );
};

export default Content;
