import React, { useState, useEffect } from 'react';
import Countries from './components/Countries';
import './App.css';

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
    <div className="app">
      <h1>Countries of the World</h1>
      <div className="filters">
        <button onClick={sortAlphabetically}>Alpha</button>
        <button onClick={() => top10('population')}>Top 10 by Population</button>
        <button onClick={() => top10('area')}>Top 10 by Area</button>
        <button onClick={() => filterByContinent('Europe')}>By Continent: Europe</button>
        <button onClick={() => filterBySubregion('Southern Asia')}>By Subregion: Southern Asia</button>
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
