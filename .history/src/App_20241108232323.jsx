import React, { useState, useEffect, useMemo } from 'react';
import Countries from './components/Countries';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filterOption, setFilterOption] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');

  // Fetch country data from the REST API on component mount
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  // Filter and sort data only when relevant filters change
  const displayedCountries = useMemo(() => {
    let filtered = [...countries];

    // Apply Continent or Subregion Filter
    if (continentFilter) {
      filtered = filtered.filter(country => country.continents.includes(continentFilter));
    } else if (subregionFilter) {
      filtered = filtered.filter(country => country.subregion === subregionFilter);
    }

    // Apply Sorting
    if (sortOption === 'alpha') {
      filtered = filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortOption === 'population') {
      filtered = filtered.sort((a, b) => b.population - a.population).slice(0, 10);
    } else if (sortOption === 'area') {
      filtered = filtered.sort((a, b) => b.area - a.area).slice(0, 10);
    }

    return filtered;
  }, [countries, continentFilter, subregionFilter, sortOption]);

  // Event handlers for filters
  const handleContinentFilter = (continent) => {
    setContinentFilter(continent);
    setSubregionFilter('');
  };

  const handleSubregionFilter = (subregion) => {
    setSubregionFilter(subregion);
    setContinentFilter('');
  };

  const handleSort = (type) => {
    setSortOption(type);
  };

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

      <Countries countries={displayedCountries} />
    </div>
  );
}

export default App;
