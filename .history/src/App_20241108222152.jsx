import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filterByContinent = (continent) => {
    setContinentFilter(continent);
    setSubregionFilter('');
    setFilteredCountries(countries.filter(country => country.continents.includes(continent)));
  };

  const filterBySubregion = (subregion) => {
    setSubregionFilter(subregion);
    setContinentFilter('');
    setFilteredCountries(countries.filter(country => country.subregion === subregion));
  };

  const top10 = (type) => {
    const sorted = [...countries].sort((a, b) => b[type] - a[type]).slice(0, 10);
    setFilteredCountries(sorted);
  };

  const sortAlphabetically = () => {
    const sorted = [...filteredCountries].sort((a, b) => a.name.common.localeCompare(b.name.common));
    setFilteredCountries(sorted);
  };

  return (
    <div>
      <h1>Countries of the World</h1>
      <button onClick={() => filterByContinent('Europe')}>Filter by Europe</button>
      <button onClick={() => filterBySubregion('Southern Asia')}>Filter by Southern Asia</button>
      <button onClick={() => top10('population')}>Top 10 by Population</button>
      <button onClick={sortAlphabetically}>Sort Alphabetically</button>
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
