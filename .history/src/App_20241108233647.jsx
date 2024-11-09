import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filterByContinent = (continent) => {
    const filtered = countries.filter(country => country.continents[0] === continent);
    setFilteredCountries(filtered);
  };

  const filterBySubregion = (subregion) => {
    const filtered = countries.filter(country => country.subregion === subregion);
    setFilteredCountries(filtered);
  };

  const top10ByPopulation = () => {
    const sorted = [...countries].sort((a, b) => b.population - a.population).slice(0, 10);
    setFilteredCountries(sorted);
  };

  const top10ByArea = () => {
    const sorted = [...countries].sort((a, b) => b.area - a.area).slice(0, 10);
    setFilteredCountries(sorted);
  };

  const sortAlphabetically = () => {
    const sorted = [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));
    setFilteredCountries(sorted);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Country Data</h1>
      <button onClick={() => sortAlphabetically()}>Alpha</button>
      <button onClick={() => top10ByPopulation()}>Top 10 by population</button>
      <button onClick={() => top10ByArea()}>Top 10 by area</button>
      <button onClick={() => filterByContinent('Africa')}>By continent</button>
      <button onClick={() => setFilteredCountries(countries)}>All</button>
      <button onClick={() => filterBySubregion('Southern Asia')}>By subregion</button>
      <button>Choose region</button>
      {/* Add additional filtering functionality for continent, subregion, etc. */}
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
