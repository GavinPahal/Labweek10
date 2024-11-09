import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Countries from './components/Countries';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Fetch country data once on component mount
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  // Filtered data by continent and subregion
  const filteredCountries = useMemo(() => {
    let filtered = [...countries];

    if (continentFilter) {
      filtered = filtered.filter(country => country.continents.includes(continentFilter));
    } else if (subregionFilter) {
      filtered = filtered.filter(country => country.subregion === subregionFilter);
    }

    return filtered;
  }, [countries, continentFilter, subregionFilter]);

  // Sorted data based on filtered data and sort option
  const sortedCountries = useMemo(() => {
    let sorted = [...filteredCountries];

    if (sortOption === 'alpha') {
      sorted = sorted.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortOption === 'population') {
      sorted = sorted.sort((a, b) => b.population - a.population).slice(0, 10);
    } else if (sortOption === 'area') {
      sorted = sorted.sort((a, b) => b.area - a.area).slice(0, 10);
    }

    return sorted;
  }, [filteredCountries, sortOption]);

  // Handlers
  const handleContinentFilter = useCallback((continent) => {
    setContinentFilter(continent);
    setSubregionFilter('');
  }, []);

  const handleSubregionFilter = useCallback((subregion) => {
    setSubregionFilter(subregion);
    setContinentFilter('');
  }, []);

  const handleSort = useCallback((type) => {
    setSortOption(type);
  }, []);

  const resetFilters = () => {
    setContinentFilter('');
    setSubregionFilter('');
    setSortOption('');
  };

  return (
    <div className="App">
      <h1>Countries of the World</h1>
      
      <div className="filters">
        <button onClick={() => handleSort('alpha')}>Alpha</button>
        <button onClick={() => handleSort('population')}>Top 10 by Population</button>
        <button onClick={() => handleSort('area')}>Top 10 by Area</button>
        
        <button onClick={() => handleContinentFilter('Africa')}>By Continent: Africa</button>
        <button onClick={() => handleContinentFilter('Asia')}>By Continent: Asia</button>
        
        <button onClick={resetFilters}>All</button>
        
        <div>
          <label>By Subregion: </label>
          <select onChange={(e) => handleSubregionFilter(e.target.value)}>
            <option value="">Choose region</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Western Europe">Western Europe</option>
            {/* Add other subregion options as needed */}
          </select>
        </div>
      </div>

      <Countries countries={sortedCountries} />
    </div>
  );
}

export default App;
